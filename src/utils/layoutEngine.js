import ELK from 'elkjs/lib/elk.bundled.js'
import { LAYOUT_CONFIG } from "../config/constants";

export class LayoutEngine {
  constructor() {
    this.elk = new ELK();
  }

  async calculateLayout(nodes, edges) {
    const nodeCount = nodes.length;
    const baseSpacing = Math.max(
      LAYOUT_CONFIG.spacing.node,
      Math.min(100, 200 / Math.sqrt(nodeCount))
    );

    const graph = {
      id: "root",
      layoutOptions: {
        "elk.algorithm": LAYOUT_CONFIG.algorithm,
        "elk.direction": LAYOUT_CONFIG.direction,
        "elk.spacing.nodeNode": `${baseSpacing}`,
        "elk.layered.spacing.nodeNodeBetweenLayers": `${baseSpacing * 2}`,
        "elk.layered.crossingMinimization.strategy": "LAYER_SWEEP",
        "elk.layered.nodePlacement.bk.fixedAlignment": "BALANCED",
        "elk.layered.layering.strategy": "NETWORK_SIMPLEX",
        "elk.layered.spacing.edgeEdgeBetweenLayers": `${LAYOUT_CONFIG.spacing.edge}`,
        "elk.edgeRouting": "ORTHOGONAL",
        "elk.layered.mergeEdges": "true",
        "elk.layered.nodePlacement.strategy": "NETWORK_SIMPLEX",
      },
      children: nodes.map((node) => ({
        ...node,
        width: 60,
        height: 50,
      })),
      edges: edges.map((edge) => ({
        id: edge.id,
        sources: [edge.source],
        targets: [edge.target],
      })),
    };

    try {
      const layoutedGraph = await this.elk.layout(graph);
      return nodes.map((node) => {
        const layoutNode = layoutedGraph.children?.find(
          (n) => n.id === node.id
        );
        return {
          ...node,
          position: {
            x: layoutNode?.x ?? 0,
            y: layoutNode?.y ?? 0,
          },
        };
      });
    } catch (error) {
      // Layout failed, return original nodes
      return nodes;
    }
  }
}
