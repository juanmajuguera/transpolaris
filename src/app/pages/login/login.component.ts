import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

login(): void {
  this.auth.login(this.username, this.password).subscribe({
    next: (res) => {
      console.log('Login response:', res);
      if (res.success) {
        this.router.navigate(['/']);
      } else {
        this.error = 'Credenciales incorrectas';
      }
    },
    error: (err) => {
      console.log('Login error:', err);
      this.error = err?.error?.error || 'Error de conexión o credenciales incorrectas';
    }
  });
}
}
