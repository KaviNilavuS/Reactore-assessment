import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from '../dashboard/dashboard.module';
import { ProjectsModule } from '../projects/projects.module';
import { SharedComponent } from './shared/shared.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SharedComponent],
  imports: [
    CommonModule,
    DashboardModule,
    ProjectsModule,
    RouterModule.forChild([
      {
        path: '',
        component: SharedComponent
      }
    ])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
