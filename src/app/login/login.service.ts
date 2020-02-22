import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(readonly http: HttpClient) {}

  submitLogin(data: any) {
    return this.http.post<boolean>(environment.apiUrl + '/api/v1/redis/login', data).subscribe(
      x => console.log(x),
      err => console.log(err, 'error')
    );
  }
}
