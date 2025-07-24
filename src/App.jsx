import React from "react";
import { RiskVisualizationDashboard } from "./components/dashboard/RiskVisualizationDashboard";
import { SAMPLE_GRAPH_DATA, SAMPLE_EDGES } from "./data/sampleData";

export default function App() {
  console.log("App component rendering...");
  console.log("Sample data:", SAMPLE_GRAPH_DATA);
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Risk Visualization Dashboard
          </h1>
          <p className="text-gray-600">
            Cloud infrastructure security overview
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[70vh]">
          <RiskVisualizationDashboard
            title="Cloud Infrastructure Security"
            subtitle="Multi-service environment with security alerts and misconfigurations"
            data={SAMPLE_GRAPH_DATA}
            edges={SAMPLE_EDGES}
          />
        </div>
      </div>
    </div>
  );
}
