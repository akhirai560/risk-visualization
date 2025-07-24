import React, { useState, useEffect, useRef } from "react";
import ReactFlow, { Controls, Background, BezierEdge } from "reactflow";
import "reactflow/dist/style.css";

import { GraphBuilder } from "../../utils/graphBuilder";
import { LayoutEngine } from "../../utils/layoutEngine";
import { SeverityCalculator } from "../../utils/severityCalculator";
import { CustomNode } from "../nodes/CustomNode";

export const GraphVisualization = ({
  data,
  edges,
  filter,
  onNodeClick,
  className = "",
}) => {
  const [collapsed, setCollapsed] = useState(new Set());
  const [elements, setElements] = useState({
    nodes: [],
    edges: [],
  });
  const [loading, setLoading] = useState(true);

  const prevPositions = useRef(new Map());
  const graphBuilder = useRef(new GraphBuilder(new SeverityCalculator()));
  const layoutEngine = useRef(new LayoutEngine());

  // Update positions ref whenever elements change
  useEffect(() => {
    prevPositions.current = new Map(
      elements.nodes.map((node) => [node.id, node.position])
    );
  }, [elements.nodes]);

  // Main layout effect
  useEffect(() => {
    let isCurrentUpdate = true;

    const updateLayout = async () => {
      setLoading(true);

      const { nodes, edges: graphEdges } = graphBuilder.current.buildGraph(
        data,
        edges,
        collapsed,
        filter
      );

      // Preserve positions from previous state
      nodes.forEach((node) => {
        const prevPosition = prevPositions.current.get(node.id);
        if (prevPosition) {
          node.position = prevPosition;
        }
      });

      const layoutedNodes = await layoutEngine.current.calculateLayout(
        nodes,
        graphEdges
      );

      if (!isCurrentUpdate) return;

      // Ensure smooth transitions
      const transitionedNodes = layoutedNodes.map((node) => ({
        ...node,
        style: {
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        },
      }));

      setElements({ nodes: transitionedNodes, edges: graphEdges });
      setLoading(false);
    };

    updateLayout();
    return () => {
      isCurrentUpdate = false;
    };
  }, [collapsed, filter, data, edges]);

  const handleNodeClick = (_, node) => {
    setCollapsed((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(node.id)) {
        newSet.delete(node.id);
      } else {
        newSet.add(node.id);
      }
      return newSet;
    });

    onNodeClick?.(node);
  };

  const nodeTypes = {
    custom: (props) => <CustomNode {...props} filter={filter} />,
  };

  const edgeTypes = {
    bezier: BezierEdge,
  };

  return (
    <div className={`w-full h-full ${className}`}>
      <ReactFlow
        nodes={elements.nodes}
        edges={elements.edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodeClick={handleNodeClick}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        minZoom={0.5}
        maxZoom={2}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        panOnScroll
        zoomOnScroll
        className="transition-opacity duration-300"
        style={{ opacity: loading ? 0.5 : 1 }}
      >
        <Controls showInteractive={false} position="top-right" />
        <Background gap={24} size={1.5} color="#e5e6ef" />
      </ReactFlow>
    </div>
  );
};
