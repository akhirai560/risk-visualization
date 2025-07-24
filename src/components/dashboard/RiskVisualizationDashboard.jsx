import React, { useState } from "react";
import { GraphVisualization } from "../graph/GraphVisualization";
import { FilterButtons } from "../ui/FilterButtons";

export const RiskVisualizationDashboard = ({
  title,
  subtitle,
  data,
  edges,
}) => {
  const [filter, setFilter] = useState("all");

  return (
    <div className="w-full h-full bg-gray-50 flex flex-col">
      <div className="p-4 bg-white border-b">
        <h1 className="text-xl font-bold">{title || "Risk Dashboard"}</h1>
        {subtitle && <p className="text-gray-600">{subtitle}</p>}

        <div className="mt-4">
          <FilterButtons currentFilter={filter} onFilterChange={setFilter} />
        </div>
      </div>

      <div className="flex-1">
        <GraphVisualization data={data} edges={edges} filter={filter} />
      </div>
    </div>
  );
};
