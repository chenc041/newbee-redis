import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(readonly http: HttpClient) {}

  submitLogin(data: any) {
    return this.http
      .post<{ name: string }>(environment.apiUrl + '/api/v1/login', data)
      .subscribe(x => console.log('x', x));
  }
}
