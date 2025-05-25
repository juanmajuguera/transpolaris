import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private username = '';

  constructor() {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('username');

    this.isAuthenticated = storedAuth === 'true';
    this.username = storedUser || '';
  }

  login(user: string, pass: string): boolean {
    if (user === 'admin' && pass === '1234') {
      this.isAuthenticated = true;
      this.username = 'Juan Pérez | Transpolaris';

      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', this.username);

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

  logout(): void {
    this.isAuthenticated = false;
    this.username = '';

    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
  }
}
