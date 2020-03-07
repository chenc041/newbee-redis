import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {
  NzLayoutModule,
  NzButtonModule,
  NzListModule,
  NzModalModule,
  NzInputModule,
  NzSelectModule,
  NzToolTipModule,
  NzDropDownModule,
  NzPopconfirmModule
} from 'ng-zorro-antd';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    FormsModule,
    CommonModule,
    NzListModule,
    NzInputModule,
    NzModalModule,
    NzButtonModule,
    NzLayoutModule,
    NzSelectModule,
    NzToolTipModule,
    NzDropDownModule,
    NzPopconfirmModule
  ]
})
export class DashboardModule {}
