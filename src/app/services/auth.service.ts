import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private username = '';
  private role = '';

  constructor() {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('username');
    const storedRole = localStorage.getItem('role');

    this.isAuthenticated = storedAuth === 'true';
    this.username = storedUser || '';
    this.role = storedRole || '';
  }

  login(user: string, pass: string): boolean {
    if (user === 'admin' && pass === '1234') {
      this.isAuthenticated = true;
      this.username = 'Juan Pérez | Transpolaris';
      this.role = 'admin';

      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', this.username);
      localStorage.setItem('role', this.role);

      return true;
    } else if (user === 'user' && pass === '1234') {
      this.isAuthenticated = true;
      this.username = 'Usuario Normal';
      this.role = 'user';

      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', this.username);
      localStorage.setItem('role', this.role);

      return true;
    }
    return false;
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

  logout(): void {
    this.isAuthenticated = false;
    this.username = '';
    this.role = '';

    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  }
}
