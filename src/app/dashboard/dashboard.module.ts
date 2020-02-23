import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ContentModule } from '../content/content.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NzLayoutModule, NzButtonModule, NzListModule, NzDropDownModule, NzSelectModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    FormsModule,
    CommonModule,
    ContentModule,
    NzButtonModule,
    NzLayoutModule,
    NzListModule,
    NzDropDownModule,
    NzSelectModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule {}
