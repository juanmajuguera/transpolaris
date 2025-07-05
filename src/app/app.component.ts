import { Component, OnInit, OnDestroy } from '@angular/core';
import { InactivityService } from './services/inactivity.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'transpolaris';
  private inactivitySubscription!: Subscription;

  constructor(
    private inactivityService: InactivityService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inactivitySubscription = this.inactivityService.inactivity$.subscribe(() => {
      console.log('Usuario inactivo: cerrando sesión automáticamente');
      this.authService.logout();
      alert('Tu sesión ha expirado por inactividad. Vuelve a iniciar sesión.');
      this.router.navigate(['/login']);
    });
  }

  ngOnDestroy(): void {
    this.inactivitySubscription?.unsubscribe();
  }
}
