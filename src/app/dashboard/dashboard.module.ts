import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TotalProjectsComponent } from './total-projects/total-projects.component';
import { MatRippleModule } from '@angular/material/core';


@NgModule({
  declarations: [TotalProjectsComponent],
  imports: [
    CommonModule,
    MatRippleModule,
  ],
  exports: [TotalProjectsComponent]
})
export class DashboardModule { }
