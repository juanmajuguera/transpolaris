import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private username = '';

  constructor() {
    // Al crear el servicio, carga estado guardado
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('username');
    this.isAuthenticated = storedAuth === 'true';
    this.username = storedUser || '';
  }

  login(user: string, pass: string): boolean {
    if (user === 'admin' && pass === '1234') {
      this.isAuthenticated = true;
      this.username = 'Juan Pérez | Transpolaris';
      // Guardar en localStorage
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
    // Eliminar del localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
  }
}
