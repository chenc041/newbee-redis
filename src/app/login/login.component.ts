import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;

  constructor(private fb: FormBuilder, readonly loginService: LoginService) {}

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.loginService.login(this.validateForm.value);
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: ['12', [Validators.required]],
      host: ['127.0.0.1', [Validators.required]],
      password: ['1234567890', [Validators.required]],
      port: ['6379', [Validators.required]],
      db: ['2', [Validators.required]]
    });
  }
}
