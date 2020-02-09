import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NzFormModule,
  NzInputModule,
  NzCheckboxModule,
  NzButtonModule
} from 'ng-zorro-antd';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    NzFormModule,
    NzInputModule,
    NzCheckboxModule,
    NzButtonModule,
    ReactiveFormsModule
  ]
})
export class LoginModule {}
