import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse, User } from 'src/app/interfaces/common';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  public authenticate(data: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/authenticate/', data);
  }
}
