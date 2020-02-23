import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(readonly http: HttpClient) {}

  handleKeys() {
    return this.http.get<string[]>(`${environment.apiUrl}/api/v1/redis/keys`, {
      params: {
        partten: '*'
      }
    });
  }
}
