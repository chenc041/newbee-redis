import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '../types/index.interface';
import { StoreService } from '../store/store.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(readonly http: HttpClient, private store: StoreService) {}

  handleKeys() {
    return this.http.get<Response<string[]>>(`${environment.apiUrl}/api/v1/redis/keys`, {
      params: {
        partten: '*'
      }
    });
  }

  handleKeyOfDetail(key: string) {
    return this.http.get<Response<string>>(`${environment.apiUrl}/api/v1/redis/key`, {
      params: {
        key
      }
    });
  }

  handleKeyOfTtl(key: string) {
    return this.http.get<Response<number>>(`${environment.apiUrl}/api/v1/redis/ttl`, {
      params: {
        key
      }
    });
  }

  handleSetKey(key: string, value: string, expireTime: string) {
    return this.http.post<Response<string>>(`${environment.apiUrl}/api/v1/redis/set`, {
      key,
      value,
      time: expireTime
    });
  }

  handleRename(key: string, newKey: string) {
    return this.http.put<Response<string>>(`${environment.apiUrl}/api/v1/redis/rename`, { key, newKey });
  }

  handleResetTtlOfKey(key: string, expireTime: string) {
    return this.http.put<Response<number>>(`${environment.apiUrl}/api/v1/redis/expire`, { key, expireTime });
  }

  handleDelete(key: string) {
    return this.http.delete<Response<number>>(`${environment.apiUrl}/api/v1/redis/key`, {
      params: { key }
    });
  }

  handleLogout() {
    return this.http.get<any>(`${environment.apiUrl}/api/v1/redis/logout`);
  }
}
