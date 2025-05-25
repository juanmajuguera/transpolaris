// layout.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  collapsed = false;

  constructor(public auth: AuthService, private router: Router) {}

  onToggleSidebar(collapsed: boolean) {
    this.collapsed = collapsed;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
