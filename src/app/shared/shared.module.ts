import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortTextPipe } from './pipes/short-text.pipe';

@NgModule({
  declarations: [ShortTextPipe],
  exports: [ShortTextPipe],
  imports: [CommonModule],
})
export class SharedModule {}
