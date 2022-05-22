import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/constants/constants.enum';
import { HttpClient } from '@angular/common/http';
import { StoreService } from 'src/app/services/store.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LoginType, Response } from 'src/app/types/index.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly message: NzMessageService,
    private readonly store: StoreService
  ) {}

  login(data: LoginType) {
    const msg$ = this.message.loading('登录中...');
    return this.http
      .post<Response<{ accessToken: string }>>(environment.apiUrl + '/api/v1/redis/login', data)
      .subscribe((val) => {
        if (val.statusCode === 200 && val.data) {
          sessionStorage.setItem(Constants.LOGIN_USER_NAME, data.name);
          sessionStorage.setItem(Constants.USER_TOKEN, val.data.accessToken);
          this.store.setSelectDb(data.db);
          setTimeout(() => {
            this.message.remove(msg$.messageId);
            this.router.navigateByUrl(Constants.LOGIN_SUCCESS_REDIRECT_URL);
          }, 1000);
        } else {
          this.message.error('登录失败!');
        }
      });
  }
}
