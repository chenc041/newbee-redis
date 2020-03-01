import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  selectDb$ = new Subject<string>();
  userName$ = new Subject<string>();
  loginSucess$ = new BehaviorSubject<boolean>(false);

  setUserName(value: string) {
    this.userName$.next(value);
  }

  setLoginStatus(value: boolean) {
    this.loginSucess$.next(value);
  }
}
