import { CtxTypes } from '@type/types';
import { ChartConfiguration, ChartData } from 'chart.js';

export const lineChartOptionsFunc = (tooltipFunc: (ctx: CtxTypes) => void) => {
  const lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,

    scales: {
      x: {
        beginAtZero: false,
        grid: {
          drawOnChartArea: false,
        },

        afterTickToLabelConversion(axis) {
          axis.ticks.forEach((tick) => {
            tick.label = tick.label
              ?.slice(0, 3)
              ?.toString()
              ?.toLocaleUpperCase();
          });
        },
      },
      y: {
        display: false,
        beginAtZero: false,
        ticks: {
          stepSize: 25,
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: false,
        external: (ctx) => tooltipFunc(ctx),
      },
      legend: {
        display: false,
      },
      filler: {
        drawTime: 'beforeDraw',
      },
    },
  };

  return lineChartOptions;
};

export const lineChartData: ChartData<'line'> = {
  labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  datasets: [
    {
      data: [65, 59, 60, 51, 56, 55, 40, 43, 43, 42, 56, 57],
      fill: false,
      borderColor: '#4B4EFC',
      borderWidth: 5,
      tension: 0.5,
      pointRadius: 2,
      pointHoverRadius: 7,
      pointBorderWidth: 1.5,
      pointHoverBorderWidth: 3,
      pointBorderColor: '#4B4EFC',
      pointBackgroundColor: '#2327ef',
      pointHoverBackgroundColor: '#fff',
    },
  ],
};
