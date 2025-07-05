import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://desarrollador.juanjuguera.com/server/login.php';
  private isAuthenticated = false;
  private username = '';
  private role = '';
  private token = '';

  constructor(private http: HttpClient) {
    const storedAuth = sessionStorage.getItem('isAuthenticated');
    const storedUser = sessionStorage.getItem('username');
    const storedRole = sessionStorage.getItem('role');
    const storedToken = sessionStorage.getItem('token');

    this.isAuthenticated = storedAuth === 'true';
    this.username = storedUser || '';
    this.role = storedRole || '';
    this.token = storedToken || '';
  }

  login(user: string, pass: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { usuario: user, password: pass }).pipe(
      tap(response => {
        if (response.success) {
          this.isAuthenticated = true;
          this.username = response.user_name;
          this.role = response.role;
          this.token = response.token;

          sessionStorage.setItem('isAuthenticated', 'true');
          sessionStorage.setItem('username', this.username);
          sessionStorage.setItem('role', this.role);
          sessionStorage.setItem('token', this.token);
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getUser(): string {
    return this.username;
  }

  getRole(): string {
    return this.role;
  }

  getToken(): string {
    return this.token;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.username = '';
    this.role = '';
    this.token = '';

    sessionStorage.clear();
  }
}
