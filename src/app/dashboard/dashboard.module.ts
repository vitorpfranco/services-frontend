import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedComponentsModule,
    MaterialModule
  ]
})
export class DashboardModule { }
