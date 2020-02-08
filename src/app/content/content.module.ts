import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { NzButtonModule, NzInputModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [ContentComponent],
  imports: [CommonModule, FormsModule, NzButtonModule, NzInputModule],
})
export class ContentModule {}
