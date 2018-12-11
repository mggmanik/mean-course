import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthData} from '../auth-data';
import {Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:3000/api/user';
  private token: string;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {
  }

  getToken() {
    return this.token;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(authData: AuthData): Observable<AuthData> {
    return this.http.post<AuthData>(`${this.baseUrl}/signup`, authData);
  }

  loginUser(authData: AuthData) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, authData)
      .subscribe(result => {
        const token = result.token;
        this.token = token;
        if (token) {
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.router.navigate(['/view-movie']);
        }
      });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/view-movie']);
  }
}
