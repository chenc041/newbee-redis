import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {
  NzLayoutModule,
  NzButtonModule,
  NzListModule,
  NzDropDownModule,
  NzSelectModule,
  NzToolTipModule,
  NzMessageService
} from 'ng-zorro-antd';

@NgModule({
  declarations: [DashboardComponent],
  providers: [NzMessageService],
  imports: [
    FormsModule,
    CommonModule,
    NzButtonModule,
    NzLayoutModule,
    NzListModule,
    NzDropDownModule,
    NzSelectModule,
    NzToolTipModule
  ]
})
export class DashboardModule {}
