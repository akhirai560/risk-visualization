import React from "react";

export const CloudIcon = ({ size = 24, className }) => (
  <svg
    height={size}
    width={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <circle cx="12" cy="12" r="12" fill="#7d3cff" opacity="0.2" />
    <path
      d="M18 14.25c0 1.8-1.46 3.25-3.25 3.25H8.5a3.25 3.25 0 01-.19-6.49h.43a4.54 4.54 0 018.85 1.49c.27.38.41.83.41 1.31v.44z"
      fill="#7d3cff"
    />
  </svg>
);

export const AWSIcon = ({ size = 32, className }) => (
  <svg
    height={size}
    width={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <circle cx="12" cy="12" r="12" fill="#cc9900" />
    <path d="M8 15h8l-4-8-4 8z" fill="#fff" />
  </svg>
);

export const GCPIcon = ({ size = 32, className }) => (
  <svg
    height={size}
    width={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <circle cx="12" cy="12" r="12" fill="#24a148" />
    <path d="M7 13l5-7 5 7-5 7-5-7z" fill="#fff" />
  </svg>
);

export const SaaSIcon = ({ size = 32, className }) => (
  <svg
    height={size}
    width={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <circle cx="12" cy="12" r="12" fill="#3c98d8" />
    <rect x="8" y="8" width="8" height="8" rx="2" fill="#fff" />
  </svg>
);

export const ServiceIcon = ({ size = 32, className }) => (
  <svg
    height={size}
    width={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <circle cx="12" cy="12" r="12" fill="#5f6ad2" />
    <rect x="9" y="8" width="6" height="8" rx="2" fill="#fff" />
  </svg>
);

export const AzureIcon = ({ size = 32, className }) => (
  <svg
    height={size}
    width={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <circle cx="12" cy="12" r="12" fill="#0078d4" />
    <path d="M15 7l-3.5 8L18 19H6l9-12z" fill="#fff" />
  </svg>
);
