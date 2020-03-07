import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Constants } from '../constants/constants.enum';
import { NzMessageService } from 'ng-zorro-antd';
import { Response } from '../types/index.interface';

const CODE_MESSAGE = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
};

@Injectable()
export class CommonHttpInterceptor implements HttpInterceptor {
  constructor(private readonly message: NzMessageService, private readonly router: Router) {}

  redirect(url: string) {
    setTimeout(() => {
      this.router.navigateByUrl(url);
    }, 200);
  }

  intercept(request: HttpRequest<Response<any>>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq: any;
    authReq = request.clone();
    if (request.url !== Constants.LOGIN_URL) {
      const authToken = localStorage.getItem(Constants.USER_TOKEN);
      authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${authToken}`)
      });
    }
    return next.handle(authReq).pipe(
      catchError((err: HttpRequest<any> & { status: number }) => {
        this.message.error(CODE_MESSAGE[err.status]);
        this.redirect(Constants.UNLOGIN_FAILED_REDIRECT_URL);
        return [];
      })
    );
  }
}
