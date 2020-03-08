import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  selectDb$ = new BehaviorSubject<number>(0);

  setSelectDb(db: number) {
    this.selectDb$.next(db);
  }

  getSelectDb() {
    return this.selectDb$.asObservable();
  }
}
