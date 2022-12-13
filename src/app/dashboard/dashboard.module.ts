import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TotalProjectsComponent } from './total-projects/total-projects.component';
import { MatRippleModule } from '@angular/material/core';
import { NgxEchartsModule } from 'ngx-echarts';


@NgModule({
  declarations: [TotalProjectsComponent],
  imports: [
    CommonModule,
    MatRippleModule,
    NgxEchartsModule
  ],
  exports: [TotalProjectsComponent]
})
export class DashboardModule { }
