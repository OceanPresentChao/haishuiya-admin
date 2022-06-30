import * as echarts from 'echarts/core';
import {
    BarChart,
    // 系列类型的定义后缀都为 SeriesOption
    type BarSeriesOption,
    LineChart,
    type LineSeriesOption,
    SunburstChart,
    type SunburstSeriesOption
} from 'echarts/charts';
import {
    TitleComponent,
    // 组件类型的定义后缀都为 ComponentOption
    type TitleComponentOption,
    TooltipComponent,
    type TooltipComponentOption,
    GridComponent,
    type GridComponentOption,
    // 数据集组件
    DatasetComponent,
    type DatasetComponentOption,
    // 内置数据转换器组件 (filter, sort)
    TransformComponent,
    ToolboxComponent,
    type ToolboxComponentOption,
    LegendComponent,
    type LegendComponentOption,
    DataZoomComponent
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
    | BarSeriesOption
    | LineSeriesOption
    | TitleComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | DatasetComponentOption
    | SunburstSeriesOption
    | ToolboxComponentOption
    | LegendComponentOption
>;

// 注册必须的组件
echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    LineChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
    ToolboxComponent,
    LegendComponent,
    BarChart,
    DataZoomComponent,
    SunburstChart
]);

export { echarts }