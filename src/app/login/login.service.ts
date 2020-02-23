import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(readonly http: HttpClient, readonly router: Router) {}

  redirectUrl = 'dashboard';

  submitLogin(data: any) {
    return this.http.post<boolean>(environment.apiUrl + '/api/v1/redis/login', data).subscribe(
      (val: boolean) => {
        if (val) {
          this.router.navigateByUrl(this.redirectUrl);
        }
      },
      err => console.log(err, 'error')
    );
  }
}
