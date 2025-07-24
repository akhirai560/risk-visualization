export const DEFAULT_FILTER_CONFIG = {
  type: "all",
  thresholds: {
    alerts: { critical: 100, high: 50, medium: 20 },
    misconfigs: { critical: 10, high: 5, medium: 2 },
  },
};

export const LAYOUT_CONFIG = {
  algorithm: "layered",
  direction: "RIGHT",
  spacing: {
    node: 60,
    layer: 120,
    edge: 30,
  },
};

export const ANIMATION_CONFIG = {
  duration: 300,
  easing: "cubic-bezier(0.4, 0, 0.2, 1)",
};

export const THEME = {
  colors: {
    primary: "#5541d7",
    alerts: "#d7263d",
    misconfigs: "#b48605",
    background: "#f9faff",
    providers: {
      aws: "#cc9900",
      gcp: "#24a148",
      saas: "#3c98d8",
      azure: "#0078d4",
      cloud: "#7d3cff",
      service: "#5f6ad2",
    },
    severity: {
      critical: "#dc2626",
      high: "#ea580c",
      medium: "#ca8a04",
      low: "#7d3cff",
    },
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },
};
