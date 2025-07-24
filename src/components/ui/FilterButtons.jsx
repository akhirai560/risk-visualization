import React from "react";

export const FilterButtons = ({
  currentFilter,
  onFilterChange,
  className = "",
}) => {
  const filters = [
    { key: "all", label: "All", color: "#5541d7" },
    { key: "alerts", label: "Alerts", color: "#d7263d" },
    { key: "misconfigs", label: "Misconfigurations", color: "#b48605" },
  ];

  const getButtonClass = (filterKey, color) => {
    const isActive = currentFilter === filterKey;
    return `rounded-lg px-5 py-1.5 font-semibold border-2 transition-colors ${
      isActive
        ? `text-white border-[${color}]`
        : `bg-white text-[${color}] border-[${color}] hover:bg-gray-50`
    }`;
  };

  const getButtonStyle = (filterKey, color) => {
    const isActive = currentFilter === filterKey;
    return isActive ? { backgroundColor: color, borderColor: color } : {};
  };

  return (
    <div className={`flex gap-2 items-center ${className}`}>
      {filters.map(({ key, label, color }) => (
        <button
          key={key}
          className={getButtonClass(key, color)}
          style={getButtonStyle(key, color)}
          onClick={() => onFilterChange(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
