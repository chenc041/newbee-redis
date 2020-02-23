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
      host: [null, [Validators.required]],
      password: [null, [Validators.required]],
      port: [null, [Validators.required]],
      db: [null, [Validators.required]]
    });
  }
}
