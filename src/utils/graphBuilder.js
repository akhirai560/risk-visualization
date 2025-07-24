import { SeverityCalculator } from "./severityCalculator";

export class GraphBuilder {
  constructor(severityCalculator = new SeverityCalculator()) {
    this.severityCalculator = severityCalculator;
  }

  buildVisibleNodes(nodes, collapsedSet, rootNodeId = "cloud") {
    const visible = new Set();

    const reveal = (id) => {
      if (!visible.has(id)) {
        visible.add(id);
        const node = nodes.find((n) => n.id === id);
        if (node?.children && !collapsedSet.has(id)) {
          node.children.forEach(reveal);
        }
      }
    };

    reveal(rootNodeId);
    return visible;
  }

  buildFilteredNodes(nodes, visible, filterType) {
    const visibleAfterFilter = new Set();

    // Step 1: Add nodes that match the filter criteria
    nodes.forEach((node) => {
      if (!visible.has(node.id)) return;
      if (filterType === "all") {
        visibleAfterFilter.add(node.id);
      } else if (filterType === "alerts" && node.alerts > 0) {
        visibleAfterFilter.add(node.id);
      } else if (filterType === "misconfigs" && node.misconfigs > 0) {
        visibleAfterFilter.add(node.id);
      }
    });

    // Step 2: Remove unreachable nodes (nodes whose parents are not visible)
    const reachableNodes = new Set();
    const findReachableNodes = (nodeId) => {
      if (reachableNodes.has(nodeId)) return;
      const node = nodes.find((n) => n.id === nodeId);
      if (!node || !visibleAfterFilter.has(nodeId)) return;
      reachableNodes.add(nodeId);
      if (node.children) {
        node.children.forEach((childId) => {
          if (visibleAfterFilter.has(childId)) {
            findReachableNodes(childId);
          }
        });
      }
    };
    if (visibleAfterFilter.has("cloud")) {
      findReachableNodes("cloud");
    }
    return reachableNodes;
  }

  buildReactFlowNodes(nodes, visible, visibleAfterFilter, collapsedSet) {
    return nodes
      .filter((n) => visible.has(n.id) && visibleAfterFilter.has(n.id))
      .map((n) => ({
        id: n.id,
        type: "custom",
        data: { ...n, collapsed: collapsedSet.has(n.id) },
        position: { x: 0, y: 0 },
      }));
  }

  buildReactFlowEdges(edges, nodes, visibleAfterFilter, filterType) {
    return edges
      .filter((e) => visibleAfterFilter.has(e.source) && visibleAfterFilter.has(e.target))
      .map((e) => {
        const targetNodeData = nodes.find((n) => n.id === e.target);
        const sourceNodeData = nodes.find((n) => n.id === e.source);

        const { color, animated, strokeWidth } = this.getEdgeStyle(
          targetNodeData,
          sourceNodeData,
          filterType
        );

        return {
          ...e,
          id: `${e.source}-${e.target}`,
          type: "bezier",
          style: {
            stroke: color,
            strokeWidth,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          },
          animated,
        };
      });
  }

  getEdgeStyle(targetNode, sourceNode, filterType = "all") {
    let color = "#7d3cff";
    let animated = false;
    let strokeWidth = 2;

    if (targetNode && sourceNode) {
      const severity = this.severityCalculator.getMaxSeverity(
        targetNode,
        sourceNode,
        filterType
      );

      switch (severity) {
        case 3: // Critical
          color = "#dc2626";
          animated = false; // Removed animation
          strokeWidth = 3;
          break;
        case 2: // High
          color = "#ea580c";
          animated = false; // Removed animation
          strokeWidth = 3;
          break;
        case 1: // Medium
          color = "#ca8a04";
          strokeWidth = 2;
          break;
        default:
          // Default colors based on type
          color = this.getProviderColor(targetNode.type);
          strokeWidth = 2;
      }
    }

    return { color, animated, strokeWidth };
  }

  getProviderColor(type) {
    const colors = {
      aws: "#cc9900",
      gcp: "#24a148",
      saas: "#3c98d8",
      azure: "#0078d4",
      cloud: "#7d3cff",
      service: "#5f6ad2",
    };
    return colors[type] || "#7d3cff";
  }

  buildGraph(nodes, edges, collapsedSet, filterType, rootNodeId = "cloud") {
    const visible = this.buildVisibleNodes(nodes, collapsedSet, rootNodeId);
    const visibleAfterFilter = this.buildFilteredNodes(
      nodes,
      visible,
      filterType
    );

    const reactFlowNodes = this.buildReactFlowNodes(
      nodes,
      visible,
      visibleAfterFilter,
      collapsedSet
    );

    const reactFlowEdges = this.buildReactFlowEdges(
      edges,
      nodes,
      visibleAfterFilter,
      filterType
    );

    return { nodes: reactFlowNodes, edges: reactFlowEdges };
  }
}
