import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { Handle, Position } from "reactflow";
import { PROVIDER_ICONS } from "../icons/iconRegistry";
import { NodeDetailPanel } from "../ui/NodeDetailPanel";

export const CustomNode = ({ data, filter }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const nodeRef = useRef(null);
  const IconComponent = PROVIDER_ICONS[data.type];

  const getNodeStyle = () => {
    if (data.alerts > 100) return "bg-red-50 hover:bg-red-100";
    if (data.alerts > 50) return "bg-orange-50 hover:bg-orange-100";
    if (data.alerts > 20) return "bg-yellow-50 hover:bg-yellow-100";
    return "bg-white hover:bg-gray-50";
  };

  const handleMouseEnter = () => {
    if (nodeRef.current) {
      const rect = nodeRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: rect.right + 10,
        y: rect.top + rect.height / 2 - 50,
      });
    }
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const nodeStyleClass = getNodeStyle();
  const hasChildren = data.children && data.children.length > 0;

  return (
    <>
      {showTooltip &&
        createPortal(
          <div
            className="fixed pointer-events-none z-[9999]"
            style={{
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y}px`,
            }}
          >
            <NodeDetailPanel data={data} />
          </div>,
          document.body
        )}

      <div
        ref={nodeRef}
        className="relative group transition-all duration-300 ease-in-out"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`rounded-full shadow-sm w-16 h-16 flex flex-col items-center justify-center cursor-pointer hover:shadow-md ${nodeStyleClass}`}
        >
          <Handle
            type="target"
            position={Position.Left}
            className="w-1.5 h-1.5 bg-white border border-gray-300 transition-all duration-300"
          />

          <Handle
            type="source"
            position={Position.Right}
            className="w-1.5 h-1.5 bg-white border border-gray-300 transition-all duration-300"
          />

          {IconComponent && <IconComponent size={24} />}

          <div style={{padding: '8px'}} className="font-medium text-xs text-gray-500 -mt-1 text-center truncate max-w-11 ">
            {data.label}
          </div>
        </div>

        {data.alerts > 0 && filter !== "misconfigs" && (
          <div style={{margin: '-12px'}} className="absolute -top-0.5 -right-0.5 bg-white rounded-full shadow-sm px-1 py-0.5 flex items-center gap-0.5">
            <span className="text-red-600 text-xs">▲</span>
            <span className="text-red-600 text-xs font-medium">
              {data.alerts}
            </span>
          </div>
        )}

        {data.misconfigs > 0 && filter !== "alerts" && (
          <div style={{margin: '-12px'}} className="absolute -bottom-0.5 -right-0.5 bg-white rounded-full shadow-sm px-1 py-0.5 flex items-center gap-0.5">
            <span className="text-yellow-600 text-xs">|||</span>
            <span className="text-yellow-600 text-xs font-medium">
              {data.misconfigs}
            </span>
          </div>
        )}

        {hasChildren && (
          <div className="absolute -bottom-0.5 -left-0.5 w-3 h-3 bg-white rounded-full flex items-center justify-center shadow-sm">
            <span className="text-gray-400 text-xs">
              {data.collapsed ? "+" : "-"}
            </span>
          </div>
        )}
      </div>
    </>
  );
};
