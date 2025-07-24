# Risk Visualization Dashboard

A React-based interactive dashboard for visualizing cloud infrastructure security risks, alerts, and misconfigurations in a hierarchical graph layout.

![React](https://img.shields.io/badge/React-19.1.0-blue)
![Vite](https://img.shields.io/badge/Vite-Build%20Tool-646CFF)
![ReactFlow](https://img.shields.io/badge/ReactFlow-Graph%20Visualization-FF6B6B)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-38B2AC)

## 📋 Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Architecture Overview](#architecture-overview)
- [Data Flow](#data-flow)
- [UI Components](#ui-components)
- [File Structure](#file-structure)
- [Customization](#customization)
- [Development](#development)

## ✨ Features

- **Interactive Graph Visualization**: Hierarchical cloud infrastructure representation using ReactFlow
- **Dynamic Filtering**: Filter by alerts, misconfigurations, or view all resources
- **Conditional Badges**: Smart badge visibility based on active filters
- **Node Interaction**: Hover tooltips with detailed information
- **Collapsible Hierarchy**: Expand/collapse nodes to manage complexity
- **Responsive Design**: Built with TailwindCSS for mobile-friendly layouts
- **Real-time Updates**: Hot module replacement for development efficiency

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd risk-visualization
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🏗️ Architecture Overview

The application follows a modular React architecture with clear separation of concerns:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Data Layer    │    │   Logic Layer    │    │   View Layer    │
│                 │    │                  │    │                 │
│ • sampleData.ts │───▶│ • GraphBuilder   │───▶│ • CustomNode    │
│ • types/        │    │ • LayoutEngine   │    │ • FilterButtons │
│                 │    │ • SeverityCalc   │    │ • DetailPanel   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Core Technologies

- **React 19.1.0**: Modern React with hooks and functional components
- **ReactFlow 11.11.4**: Professional graph visualization library
- **TailwindCSS 4.1.11**: Utility-first CSS framework
- **Vite**: Fast build tool and development server
- **ELK.js**: Graph layout algorithm engine
- **Lucide React**: Modern icon library

## 📊 Data Flow

### 1. Data Structure

The application works with hierarchical node data:

```typescript
interface NodeData {
  id: string; // Unique identifier
  label: string; // Display name
  type: string; // Node type (aws, gcp, s3, etc.)
  alerts: number; // Security alert count
  misconfigs: number; // Misconfiguration count
  children?: string[]; // Child node IDs
  collapsed?: boolean; // Collapse state
}
```

### 2. Data Processing Pipeline

```
Raw Data (sampleData.ts)
         ↓
GraphBuilder.buildGraph()
         ↓
LayoutEngine.applyLayout()
         ↓
ReactFlow Nodes/Edges
         ↓
CustomNode Components
```

### 3. Filter State Management

```javascript
// Filter states affect both data processing and UI rendering
const [filter, setFilter] = useState("all");

// Data filtering in GraphBuilder
const filteredNodes = GraphBuilder.filterNodes(nodes, filter);

// UI conditional rendering in CustomNode
{
  data.alerts > 0 && filter !== "misconfigs" && <AlertBadge />;
}
{
  data.misconfigs > 0 && filter !== "alerts" && <MisconfigBadge />;
}
```

### 4. Event Flow

```
User Action (Filter Click)
         ↓
Dashboard State Update
         ↓
GraphVisualization Re-render
         ↓
CustomNode Prop Update
         ↓
Conditional Badge Rendering
```

## 🎨 UI Components

### Component Hierarchy

```
App.jsx
└── RiskVisualizationDashboard.tsx
    ├── FilterButtons.tsx
    └── GraphVisualization.jsx
        ├── CustomNode.jsx
        │   └── NodeDetailPanel.tsx (Portal)
        └── ReactFlow
            ├── Background
            ├── Controls
            └── MiniMap
```

### Key Components

#### **CustomNode.jsx**

- **Purpose**: Individual graph node rendering
- **Props**: `{ data, filter }`
- **Features**:
  - Dynamic styling based on alert levels
  - Conditional badge visibility
  - Hover tooltip integration
  - Icon rendering by provider type

#### **GraphVisualization.jsx**

- **Purpose**: Main graph container and layout
- **Responsibilities**:
  - Node/edge processing
  - Layout computation
  - Filter prop distribution
  - ReactFlow configuration

#### **FilterButtons.tsx**

- **Purpose**: Filter control interface
- **States**: `all | alerts | misconfigs`
- **Features**: Active state styling, click handlers

#### **NodeDetailPanel.tsx**

- **Purpose**: Detailed node information tooltip
- **Rendering**: Portal-based absolute positioning
- **Content**: Provider details, metrics, status

### Styling System

- **Framework**: TailwindCSS with utility classes
- **Theme**: Gray/white base with color-coded alerts
- **Responsive**: Mobile-first approach
- **Animations**: CSS transitions for smooth interactions

## 📁 File Structure

```
src/
├── components/
│   ├── dashboard/
│   │   └── RiskVisualizationDashboard.tsx  # Main dashboard container
│   ├── graph/
│   │   └── GraphVisualization.jsx          # Graph rendering component
│   ├── icons/
│   │   ├── iconRegistry.ts                 # Provider icon mappings
│   │   └── ProviderIcons.tsx               # Icon components
│   ├── nodes/
│   │   └── CustomNode.jsx                  # Individual node component
│   └── ui/
│       ├── FilterButtons.tsx               # Filter controls
│       └── NodeDetailPanel.tsx             # Tooltip panel
├── config/
│   └── constants.ts                        # App configuration
├── data/
│   └── sampleData.ts                       # Mock data source
├── types/
│   └── index.ts                            # TypeScript interfaces
├── utils/
│   ├── graphBuilder.ts                     # Graph processing logic
│   ├── layoutEngine.ts                     # Layout algorithms
│   └── severityCalculator.ts               # Risk assessment
├── App.jsx                                 # Root component
└── main.jsx                                # React entry point
```

## 🎛️ Customization

### Adding New Node Types

1. **Update icon registry**:

   ```javascript
   // src/components/icons/iconRegistry.ts
   export const PROVIDER_ICONS = {
     existing: ExistingIcon,
     newtype: NewTypeIcon, // Add new icon
   };
   ```

2. **Add sample data**:
   ```javascript
   // src/data/sampleData.ts
   {
     id: "new-node",
     type: "newtype",
     // ... other properties
   }
   ```

### Customizing Node Appearance

```javascript
// src/components/nodes/CustomNode.jsx
const getNodeStyle = () => {
  if (data.alerts > 100) return "bg-red-50 hover:bg-red-100";
  if (data.alerts > 50) return "bg-orange-50 hover:bg-orange-100";
  // Add custom styling logic
};
```

### Adding New Filters

1. **Update filter type**:

   ```typescript
   // src/types/index.ts
   export interface FilterConfig {
     type: "all" | "alerts" | "misconfigs" | "newfilter";
   }
   ```

2. **Implement filter logic**:
   ```javascript
   // src/utils/graphBuilder.ts
   filterNodes(nodes, filter) {
     if (filter === "newfilter") {
       return nodes.filter(node => /* custom logic */);
     }
   }
   ```

## 🛠️ Development

### Code Style

- **JavaScript**: ES6+ with JSX
- **TypeScript**: Interfaces for data structures
- **CSS**: Utility-first with TailwindCSS
- **Linting**: ESLint configuration included

### Key Development Patterns

- **Functional Components**: Using React hooks
- **Prop Drilling**: Filter state passed through component tree
- **Portal Rendering**: Tooltips rendered outside component hierarchy
- **State Management**: Local state with useState hooks

### Common Tasks

**Adding a new component**:

```bash
# Create component file
touch src/components/category/NewComponent.jsx

# Export from index if needed
echo "export { NewComponent } from './category/NewComponent';" >> src/index.js
```

**Debugging filter issues**:

```javascript
// Add logging to GraphVisualization.jsx
console.log("Current filter:", filter);
console.log("Nodes with filter prop:", nodeTypes);
```

**Testing layout changes**:

```javascript
// Modify src/utils/layoutEngine.ts
export const LAYOUT_CONFIG = {
  "elk.direction": "RIGHT", // Try 'DOWN', 'LEFT', 'UP'
  "elk.spacing.nodeNode": 100, // Adjust spacing
};
```

### Performance Considerations

- **Memoization**: Consider `useMemo` for expensive calculations
- **Virtual Rendering**: ReactFlow handles large graphs efficiently
- **Bundle Size**: Tree-shaking enabled with Vite
- **Hot Reload**: Fast refresh for development iterations

## 🤖 Development History

The initial draft of this project was created using **Gemini CLI**, providing a solid foundation for the risk visualization dashboard. Subsequent development and enhancements have been made through collaborative coding sessions.

## 📝 License

This project is licensed under the MIT License. See LICENSE file for details.
