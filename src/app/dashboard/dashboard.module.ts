import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ContentModule } from '../content/content.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NzLayoutModule, NzButtonModule, NzListModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, DashboardRoutingModule, ContentModule, NzButtonModule, NzLayoutModule, NzListModule],
})
export class DashboardModule {}
