import React from "react";
import { PROVIDER_ICONS } from "../icons/iconRegistry";

export const NodeDetailPanel = ({ data, className = "" }) => {
  if (!data) return null;

  const getAlertSeverity = (count) => {
    if (count > 100) return "Critical";
    if (count > 50) return "High";
    if (count > 20) return "Medium";
    return "Low";
  };

  const getMisconfigSeverity = (count) => {
    if (count > 10) return "Critical";
    if (count > 5) return "High";
    if (count > 2) return "Medium";
    return "Low";
  };

  const IconComponent = PROVIDER_ICONS[data.type];
  const alertSeverity = getAlertSeverity(data.alerts);
  const misconfigSeverity = getMisconfigSeverity(data.misconfigs);

  return (
    <div
      className={`bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-64 ${className}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 flex-shrink-0">
          {IconComponent && <IconComponent size={32} />}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-800 text-base truncate">
            {data.label}
          </h3>
          <p className="text-sm text-gray-500">{data.type.toUpperCase()}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="bg-red-50 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-red-800">Alerts</span>
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-red-100 text-red-800">
              {alertSeverity}
            </span>
          </div>
          <div className="text-2xl font-bold text-red-600">{data.alerts}</div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-yellow-800">
              Misconfigurations
            </span>
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
              {misconfigSeverity}
            </span>
          </div>
          <div className="text-2xl font-bold text-yellow-600">
            {data.misconfigs}
          </div>
        </div>

        {data.children && data.children.length > 0 && (
          <div className="border-t border-gray-200 pt-3 mt-3">
            <p className="text-sm text-gray-600 mb-2 font-medium">
              Connected Nodes:
            </p>
            <div className="flex flex-wrap gap-2">
              {data.children.map((childId) => (
                <span
                  key={childId}
                  className="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-700 font-medium"
                >
                  {childId}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
