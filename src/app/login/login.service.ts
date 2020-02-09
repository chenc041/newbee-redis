import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(readonly http: HttpClient) {}

  submitLogin(data: any) {
    console.log('---submitLogin---');
    return this.http
      .get<{ name: string }>(environment.apiUrl + '/api/v1/demo')
      .pipe(
        tap((newHero: { name: string }) =>
          console.log(`added hero w/ id=${newHero}`)
        )
      );
  }
}
