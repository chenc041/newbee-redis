import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '../enum/constants.enum';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(readonly http: HttpClient, readonly router: Router, private message: NzMessageService) {}

  login(data: any) {
    return this.http.post<boolean>(environment.apiUrl + '/api/v1/redis/login', data).subscribe(
      (val: boolean) => {
        sessionStorage.setItem(Constants.LOGIN_SUCCESS, 'true');
        this.router.navigateByUrl(Constants.LOGIN_SUCCESS_REDIRECT_URL);
      },
      err => this.message.error('登录失败, 请重试!!', { nzDuration: 3000 })
    );
  }
}
