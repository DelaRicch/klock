import { ButtonModule } from 'primeng/button';
import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { Chart, LineController, elements, plugins } from 'chart.js';

@Component({
  selector: 'app-sales-graph',
  standalone: true,
  imports: [ButtonModule, ChartModule],
  templateUrl: './sales-graph.component.html',
  styleUrl: './sales-graph.component.css',
})
export class SalesGraphComponent implements OnInit {
  data: any;

  options: any;
  ngOnInit(): void {
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          data: ['25.00', '59.00', '50.00', '28.00', '16.00', '55.00', '50.00'],
          fill: false,
        },
      ],
    };
    this.options = {
      responsive: true,
      elements: {
        line: {
          borderWidth: 5,
          borderColor: '#4B4EFC',
          tension: 0.5,
          capBezierPoints: true,
          showLine: true,
          spanGaps: true,
        },
        point: {
          pointStyle: 'oval',
          radius: 1.5,
          pointHoverRadius: 6.5,
          backgroundColor: '#4B4EFC',
          pointHoverBackgroundColor: '#FFFFFF',
          borderColor: '#4B4EFC',
          pointerHoverBorderColor: '#4B4EFC',
          borderWidth: 1,
          pointHoverBorderWidth: 3,
          pointHitRadius: 10,
        },
      },
      maintainAspectRatio: false,
      interaction: {
        mode: 'x',
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: '#4B4EFC',
          titleColor: '#FFFFFF',
          yAlign: 'bottom',
          position: 'nearest',
          displayColors: false,
          padding: 10,
          bodyAlign: 'center',
          titleAlign: 'center',
          callbacks: {
            title: () => {
              return '';
            },
            label: (ctx: any) => {
              return '$' + ctx?.raw;
            },
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#667085',
          },
          grid: {
            display: false,
          },
        },
        y: {
          display: false,
          // offset: true,
          beginAtZero: true,
        },
      },
    };
  }
}
