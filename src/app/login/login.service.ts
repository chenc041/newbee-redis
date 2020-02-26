import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '../enum/constants.enum';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LoginType, Response } from '../types/index.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(readonly http: HttpClient, readonly router: Router, private message: NzMessageService) {}

  login(data: LoginType) {
    return this.http.post<Response<boolean>>(environment.apiUrl + '/api/v1/redis/login', data).subscribe(
      val => {
        if (val.statusCode === 200 && val.data) {
          sessionStorage.setItem(Constants.LOGIN_USER_NAME, data.name);
          sessionStorage.setItem(Constants.LOGIN_SUCCESS, 'true');
          this.router.navigateByUrl(Constants.LOGIN_SUCCESS_REDIRECT_URL);
        }
      },
      err => this.message.error('登录失败, 请稍后重试!!', { nzDuration: 3000 })
    );
  }
}
