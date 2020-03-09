import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment';
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
    let fbObj = {
      name: ['chenc', [Validators.required]],
      host: ['127.0.0.1', [Validators.required]],
      password: ['1234567890', [Validators.required]],
      port: [6379, [Validators.required]],
      db: [2, [Validators.required]]
    };
    if (environment.production) {
      fbObj = {
        name: [null, [Validators.required]],
        host: [null, [Validators.required]],
        password: [null, [Validators.required]],
        port: [null, [Validators.required]],
        db: [null, [Validators.required]]
      };
    }
    this.validateForm = this.fb.group(fbObj);
  }
}
