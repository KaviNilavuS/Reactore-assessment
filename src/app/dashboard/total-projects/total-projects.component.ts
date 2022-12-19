import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

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
  projectName = [];
  percentage = [];
  finalData: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    let totalPercentage = 0;
    this.dataService.currentData.subscribe((res) => {
      this.finalData = res;
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
  }
}
