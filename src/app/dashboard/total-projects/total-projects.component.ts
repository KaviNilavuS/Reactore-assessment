import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { EChartsOption, ECharts } from 'echarts';

@Component({
  selector: 'app-total-projects',
  templateUrl: './total-projects.component.html',
  styleUrls: ['./total-projects.component.scss'],
})
export class TotalProjectsComponent implements OnInit {
  count;
  overallProgress = 0;
  centered = false;
  disabled = false;
  unbounded = false;
  radius: number;
  color: string;
  chart: ECharts;
  projectName = [];
  percentage = [];
  title = 'Projects';
  series = '';

  chartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
      },
    ],
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    let totalPercentage = 0;
    this.dataService.currentData.subscribe((res) => {
      this.projectName = [];
      this.percentage = [];
      totalPercentage = 0;
      res.forEach((element) => {
        totalPercentage += Number(element.percentage);
        this.projectName.push(element.projectname);
        this.percentage.push(element.percentage);
      });
      this.count = res.length;

      this.overallProgress = totalPercentage ? Math.round(totalPercentage / this.count) : 0;
    });
    this.prepareChart();
  }

  public onChartInit(event: ECharts): void {
    this.chart = event;
  }

  prepareChart() {
    let p = [];
    this.dataService.currentData.subscribe((res) => {
      res.forEach((element) => {
        p.push(element.projectname);
      });

      this.chartOption.xAxis = {
        data: this.projectName,
        type: 'category',
      };
      this.chartOption.series = [
        {
          data: this.percentage,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)',
          },
        },
      ];
      this.chart?.setOption(this.chartOption);
    });
  }
}
