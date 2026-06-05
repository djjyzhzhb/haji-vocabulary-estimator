## 1. Architecture Design

```mermaid
graph TB
    subgraph Frontend Layer
        Router[App Router]
        Router --> Layout[Layout Component]
        
        Layout --> Sidebar[Navigation Sidebar]
        Layout --> Content[Content Area]
        
        Content --> Pages[Page Components]
        Pages --> Dashboard[Dashboard Page]
        Pages --> Params[Parameters Page]
        Pages --> Results[Results Page]
        Pages --> Sensitivity[Sensitivity Page]
        Pages --> History[History Page]
        Pages --> Report[Report Page]
    end
    
    subgraph Component Layer
        subgraph LayoutComponents[Layout Components]
            SidebarComp[Sidebar]
            Header[Header]
            Footer[Footer]
        end
        
        subgraph FeatureComponents[Feature Components]
            ParamControls[Parameter Controls]
            Charts[Chart Components]
            Tables[Table Components]
            Exporters[Export Components]
        end
        
        subgraph CommonComponents[Common Components]
            KPICards[KPI Cards]
            Buttons[Buttons]
            Inputs[Inputs]
            Modals[Modals]
        end
    end
    
    subgraph Business Logic Layer
        Hooks[Custom Hooks]
        Store[Zustand Store]
        Services[Services]
    end
    
    subgraph Core Layer
        Calculator[Calculator Engine]
        Validators[Validators]
        Formatters[Formatters]
        Constants[Constants]
    end
    
    Frontend Layer --> Component Layer
    Component Layer --> Business Logic Layer
    Business Logic Layer --> Core Layer
```

---

## 2. Module Design Principles

### 2.1 Modular Architecture
- **分层清晰**：Presentation → Business → Core，每层单向依赖
- **高内聚低耦合**：相关功能组织在同一模块，模块间依赖最小化
- **可替换性**：每个模块可独立替换而不影响其他模块
- **可测试性**：每个模块可独立单元测试

### 2.2 Directory Structure (Enhanced)

```
web-app/
├── src/
│   ├── pages/                    # 页面层
│   │   ├── Dashboard.tsx
│   │   ├── Parameters.tsx
│   │   ├── Results.tsx
│   │   ├── Sensitivity.tsx
│   │   ├── History.tsx
│   │   └── Report.tsx
│   │
│   ├── components/               # 组件层
│   │   ├── layout/              # 布局组件
│   │   │   ├── Layout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── parameters/          # 参数组件
│   │   │   ├── ParamGroup.tsx
│   │   │   ├── ParamSlider.tsx
│   │   │   ├── ParamInput.tsx
│   │   │   ├── PresetManager.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── charts/              # 图表组件
│   │   │   ├── LengthDistChart.tsx
│   │   │   ├── ThreeLayerChart.tsx
│   │   │   ├── SensitivityCurve.tsx
│   │   │   ├── SankeyFlowChart.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── tables/              # 表格组件
│   │   │   ├── ResultTable.tsx
│   │   │   ├── HistoryTable.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── common/              # 通用组件
│   │   │   ├── KPICard.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── index.ts
│   │   │
│   │   └── features/            # 功能组件
│   │       ├── export/
│   │       │   ├── ExportButtons.tsx
│   │       │   └── ExportModal.tsx
│   │       └── theme/
│   │           ├── ThemeToggle.tsx
│   │           └── ThemeProvider.tsx
│   │
│   ├── hooks/                   # 自定义Hooks
│   │   ├── useDebounce.ts
│   │   ├── useTheme.ts
│   │   ├── useCalculation.ts
│   │   ├── useSensitivity.ts
│   │   ├── useHistory.ts
│   │   ├── usePresets.ts
│   │   └── useExport.ts
│   │
│   ├── store/                   # 状态管理
│   │   ├── index.ts
│   │   ├── useAppStore.ts
│   │   ├── slices/
│   │   │   ├── paramsSlice.ts
│   │   │   ├── resultSlice.ts
│   │   │   ├── historySlice.ts
│   │   │   ├── presetsSlice.ts
│   │   │   └── uiSlice.ts
│   │   └── middleware/
│   │       ├── persist.ts
│   │       └── logger.ts
│   │
│   ├── services/                # 服务层
│   │   ├── calculationService.ts
│   │   ├── sensitivityService.ts
│   │   ├── historyService.ts
│   │   ├── presetService.ts
│   │   ├── exportService.ts
│   │   └── validationService.ts
│   │
│   ├── engine/                  # 核心计算引擎
│   │   ├── index.ts
│   │   ├── types.ts
│   │   ├── constants.ts
│   │   ├── synchronicModel.ts
│   │   ├── extensionModel.ts
│   │   ├── calculator.ts
│   │   └── validators.ts
│   │
│   ├── utils/                   # 工具函数
│   │   ├── formatters.ts
│   │   ├── numbers.ts
│   │   ├── storage.ts
│   │   └── colors.ts
│   │
│   ├── types/                   # 类型定义
│   │   ├── index.ts
│   │   ├── params.ts
│   │   ├── results.ts
│   │   ├── history.ts
│   │   └── presets.ts
│   │
│   ├── config/                  # 配置
│   │   ├── index.ts
│   │   ├── app.ts
│   │   ├── routes.ts
│   │   └── themes.ts
│   │
│   ├── assets/                  # 静态资源
│   │   ├── icons/
│   │   └── images/
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── tests/                       # 测试
│   ├── unit/
│   │   ├── engine/
│   │   ├── services/
│   │   └── utils/
│   ├── integration/
│   └── e2e/
│
├── scripts/                     # 脚本
│   └── build.js
│
├── .trae/
│   └── documents/
│
└── package.json
```

---

## 3. Technology Stack & Dependencies

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.22.0",
    "zustand": "^4.5.0",
    "recharts": "^2.10.0",
    "lucide-react": "^0.344.0",
    "framer-motion": "^11.0.0",
    "xlsx": "^0.18.5",
    "file-saver": "^2.0.5",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@types/file-saver": "^2.0.7",
    "typescript": "~5.4.0",
    "vite": "^5.1.0",
    "@vitejs/plugin-react": "^4.2.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "vitest": "^1.3.0",
    "@testing-library/react": "^14.2.0"
  }
}
```

---

## 4. Extensibility Design

### 4.1 Plugin System (Future Ready)

```typescript
// Plugin Interface
interface CalculationPlugin {
  id: string;
  name: string;
  version: string;
  
  // Hooks into calculation pipeline
  beforeCalculate?: (params: ModelParams) => ModelParams;
  afterCalculate?: (result: CalculationResult) => CalculationResult;
  
  // Optional custom visualization
  customCharts?: CustomChart[];
}

// Custom chart definition
interface CustomChart {
  id: string;
  name: string;
  component: React.ComponentType<{ result: CalculationResult }>;
  position: 'results' | 'dashboard';
}

// Plugin registry
class PluginRegistry {
  private plugins: Map<string, CalculationPlugin> = new Map();
  
  register(plugin: CalculationPlugin) {
    this.plugins.set(plugin.id, plugin);
  }
  
  unregister(id: string) {
    this.plugins.delete(id);
  }
  
  getPlugins(): CalculationPlugin[] {
    return Array.from(this.plugins.values());
  }
}
```

### 4.2 Calculation Engine Architecture

```typescript
// Calculator context for extensibility
interface CalculatorContext {
  params: ModelParams;
  plugins: CalculationPlugin[];
  options: CalculationOptions;
}

// Pipeline pattern for calculations
class CalculationPipeline {
  private steps: CalculationStep[] = [];
  
  addStep(step: CalculationStep) {
    this.steps.push(step);
    return this;
  }
  
  async execute(context: CalculatorContext): Promise<CalculationResult> {
    let currentContext = context;
    
    for (const step of this.steps) {
      currentContext = await step.execute(currentContext);
    }
    
    return currentContext.result!;
  }
}
```

### 4.3 Custom Model Support

```typescript
// Model interface for custom implementations
interface ICalculationModel {
  name: string;
  version: string;
  
  calculate(params: ModelParams): CalculationResult;
  validateParams(params: ModelParams): ValidationResult;
  getDescription(): string;
}

// Built-in model
class DefaultModel implements ICalculationModel { /* ... */ }

// Can add custom models:
class AlternativeModel1 implements ICalculationModel { /* ... */ }
class ExperimentalModel implements ICalculationModel { /* ... */ }
```

### 4.4 Theme System

```typescript
// Theme configuration
interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
  };
  fonts: {
    heading: string;
    body: string;
    mono: string;
  };
}

// Theme manager
class ThemeManager {
  private themes: Map<string, Theme> = new Map();
  private currentTheme: Theme;
  
  registerTheme(theme: Theme) {
    this.themes.set(theme.id, theme);
  }
  
  setTheme(id: string) {
    this.currentTheme = this.themes.get(id)!;
  }
  
  getTheme(id: string): Theme | undefined {
    return this.themes.get(id);
  }
}
```

---

## 5. State Management Architecture

### 5.1 Slice Pattern for Zustand

```typescript
// Each feature gets its own slice
// slices/paramsSlice.ts
const createParamsSlice: StateCreator<AppState, [], [], ParamsState> = (set, get) => ({
  params: DEFAULT_PARAMS,
  updateParam: (key, value) => set((state) => ({
    params: { ...state.params, [key]: value },
  })),
  setParams: (params) => set({ params }),
  resetParams: () => set({ params: DEFAULT_PARAMS }),
});

// slices/resultSlice.ts
const createResultSlice: StateCreator<AppState, [], [], ResultState> = (set, get) => ({
  result: null,
  calculate: () => {
    const params = get().params;
    const result = Calculator.calculate(params);
    set({ result });
  },
});

// Combine slices in main store
const useAppStore = create<AppState>()((...a) => ({
  ...createParamsSlice(...a),
  ...createResultSlice(...a),
  ...createHistorySlice(...a),
  ...createPresetsSlice(...a),
  ...createUISlice(...a),
}));
```

---

## 6. Route Definitions

| Route | Purpose |
|-------|---------|
| / | Dashboard - 总览页面 |
| /parameters | 参数配置页面 |
| /results | 结果展示页面 |
| /sensitivity | 敏感性分析页面 |
| /history | 历史对比页面 |
| /report | 报告生成页面 |

---

## 7. Data Model & Types

See [types/index.ts] for complete type definitions.

Key interfaces:
- `ModelParams` - 参数配置
- `CalculationResult` - 计算结果
- `SensitivityCurve` - 敏感性分析数据
- `Preset` - 预设方案
- `CalculationPlugin` - 插件接口

---

## 8. Performance Considerations

### 8.1 Optimization Strategies
- **Debounced Calculations** - 300ms防抖减少计算频率
- **Memoized Components** - React.memo防止不必要重渲染
- **Selective Re-rendering** - Zustand selectors减少订阅范围
- **Virtualized Lists** - 大列表使用虚拟滚动
- **Web Workers** - 敏感性分析等重计算放后台线程

### 8.2 Code Splitting
```typescript
// Route-based code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Sensitivity = lazy(() => import('./pages/Sensitivity'));
```

---

## 9. Testing Strategy

### 9.1 Test Pyramid
- **Unit Tests** (70%) - 核心算法、工具函数、Hooks
- **Integration Tests** (20%) - 服务层、组件集成
- **E2E Tests** (10%) - 关键用户流程

### 9.2 Test Coverage Targets
- Core Engine: > 90%
- Services: > 80%
- Components: > 70%

---

## 10. Future Expansion Paths

### 10.1 Planned Features
- Multi-language support (i18n)
- Collaborative editing (WebSocket)
- Cloud sync (Supabase)
- API endpoints for external integration
- Parameter optimization algorithms (ML-based)

### 10.2 Migration Paths
- Easy migration to Next.js (SSR/SSG)
- PWA support for offline usage
- Electron wrapper for desktop app
