import { DEFAULT_FILTER_CONFIG } from "../config/constants";

export class SeverityCalculator {
  constructor(config = DEFAULT_FILTER_CONFIG) {
    this.config = config;
  }

  getAlertSeverity(count) {
    const { critical, high, medium } = this.config.thresholds.alerts;

    if (count > critical) return { level: 3, label: "Critical" };
    if (count > high) return { level: 2, label: "High" };
    if (count > medium) return { level: 1, label: "Medium" };
    return { level: 0, label: "Low" };
  }

  getMisconfigSeverity(count) {
    const { critical, high, medium } = this.config.thresholds.misconfigs;

    if (count > critical) return { level: 3, label: "Critical" };
    if (count > high) return { level: 2, label: "High" };
    if (count > medium) return { level: 1, label: "Medium" };
    return { level: 0, label: "Low" };
  }

  getNodeSeverity(node, filterType) {
    if (filterType === "alerts") {
      return this.getAlertSeverity(node.alerts).level;
    } else if (filterType === "misconfigs") {
      return this.getMisconfigSeverity(node.misconfigs).level;
    }
    return 1; // For "all" filter
  }

  getMaxSeverity(node1, node2, filterType) {
    return Math.max(
      this.getNodeSeverity(node1, filterType),
      this.getNodeSeverity(node2, filterType)
    );
  }
}
