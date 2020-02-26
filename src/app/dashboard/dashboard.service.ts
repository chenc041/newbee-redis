import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '../types/index.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(readonly http: HttpClient) {}

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

  handleRename(key: string) {
    return this.http.put<Response<string>>(`${environment.apiUrl}/api/v1/redis/rename`, { key });
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
