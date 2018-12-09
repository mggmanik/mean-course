import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthData} from '../auth-data';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:3000/api/user';

  constructor(private http: HttpClient) {
  }

  createUser(authData: AuthData): Observable<AuthData> {
    return this.http.post<AuthData>(`${this.baseUrl}/signup`, authData);
  }

  loginUser(authData: AuthData): Observable<AuthData> {
    return this.http.post<AuthData>(`${this.baseUrl}/login`, authData);
  }
}
