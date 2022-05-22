import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from 'webapp/src/app/dashboard/dashboard.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { SharedModule } from 'webapp/src/app/shared/shared.module';
import { NzSelectModule } from 'ng-zorro-antd/select';
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    FormsModule,
    NzIconModule,
    CommonModule,
    NzFormModule,
    NzListModule,
    NzInputModule,
    NzModalModule,
    NzButtonModule,
    NzDividerModule,
    NzLayoutModule,
    NzToolTipModule,
    NzPopconfirmModule,
    SharedModule,
    NzSelectModule,
  ],
})
export class DashboardModule {}
