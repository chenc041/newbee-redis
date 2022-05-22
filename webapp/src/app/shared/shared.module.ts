import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortTextPipe } from 'src/app/shared/pipes/short-text.pipe';

@NgModule({
  declarations: [ShortTextPipe],
  exports: [ShortTextPipe],
  imports: [CommonModule],
})
export class SharedModule {}
