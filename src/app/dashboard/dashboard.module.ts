import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { NzLayoutModule, NzButtonModule, NzListModule, NzDropDownModule, NzSelectModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [DashboardComponent],
  imports: [FormsModule, CommonModule, NzButtonModule, NzLayoutModule, NzListModule, NzDropDownModule, NzSelectModule]
})
export class DashboardModule {}
