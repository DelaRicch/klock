import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { SalesGraphTooltipComponent } from '@components/admin/sales-graph-tooltip/sales-graph-tooltip.component';
import {
  lineChartData,
  lineChartOptionsFunc,
} from '@components/admin/sales-graph/chart.config';
import { SvgIconComponent } from '@components/shared/svg-icon/svg-icon.component';
import { YearPickerComponent } from '@components/year-picker/year-picker.component';
import { CtxTypes } from '@type/types';
import { ChartEvent, LineElement } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'klock-sales-graph',
  standalone: true,
  imports: [
    SalesGraphTooltipComponent,
    BaseChartDirective,
    YearPickerComponent,
    SvgIconComponent,
  ],
  template: `
    <section class="w-3/12 flex flex-col">
      <h4 class="font-semibold text-xl capitalize mb-3">sales graph</h4>
      <span class="text-4xl font-bold">$37.5K</span>
      <span class="flex items-center gap-2 text-sm text-grey-G500 mt-1">
        <span>Total</span>
        <klock-svg-icon svgName="increase"></klock-svg-icon>
        <span class="text-green-G100 font-bold">+2.45%</span>
      </span>
      <span class="flex items-center gap-2 mt-1">
        <klock-svg-icon svgName="check"></klock-svg-icon>
        <span class="text-green-G100 font-bold">On Track</span>
      </span>
    </section>
    <section class="w-full h-[345px] flex items-end relative">
      <klock-year-picker class="absolute top-2 right-2"></klock-year-picker>
      <div class="relative w-full h-full flex items-end">
        @if(tooltip.display) {
        <klock-sales-graph-tooltip
          [left]="tooltip.left"
          [top]="tooltip.top"
          [value]="tooltip.value"
        ></klock-sales-graph-tooltip>
        }
        <canvas
          baseChart
          class="max-w-full max-h-[15rem]"
          [type]="lineChartType"
          [data]="lineChartData"
          [options]="lineChartOptions"
          (chartHover)="chartHover($event)"
        ></canvas>
      </div>
    </section>
  `,
})
export class SalesGraphComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective<'line'>;

  tooltip = {
    top: 0,
    bottom: 0,
    left: 0,
    value: 0,
    display: false,
  };

  lineChartType = 'line' as const;
  lineChartData = lineChartData;
  lineChartOptions = lineChartOptionsFunc(this.tooltipFunction.bind(this));

  tooltipFunction(ctx: CtxTypes) {
    this.tooltip.value = ctx.tooltip.dataPoints[0].parsed.y;
  }

  @HostBinding('class') get hostClass() {
    return 'w-full flex rounded-lg pt-2 px-4 pb-7';
  }

  ngOnInit(): void {
    console.log('leet');
  }

  chartHover({ event, active }: { event: ChartEvent; active: object[] }) {
    const item = active[0] as { element: LineElement };
    const lineElement = item?.element;
    const height = lineElement?.y;
    const xAxis = lineElement?.x;
    this.tooltip.display = lineElement !== undefined;
    this.tooltip.left = xAxis;
    this.tooltip.top = height;
  }
}
