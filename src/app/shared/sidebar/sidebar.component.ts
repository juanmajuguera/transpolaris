import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() collapsed = false;                      
  @Output() collapsedChange = new EventEmitter<boolean>();

  // Cambiamos a objeto para controlar múltiples submenús
  submenuOpen: { [key: string]: boolean } = {
    menu: false,
    servicios: false
  };

  isDarkMode = false;
  private submenuWasCollapsed = false;

  constructor(public auth: AuthService) {}

  toggleSidebar() {
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed);

    if (this.collapsed) {
      // Cerramos todos los submenús al colapsar
      Object.keys(this.submenuOpen).forEach(key => this.submenuOpen[key] = false);
    }
  }

  toggleSubmenu(menu: string) {
    if (this.collapsed) {
      this.submenuWasCollapsed = true;
      this.collapsed = false;
      this.collapsedChange.emit(this.collapsed);

      setTimeout(() => {
        const aside = document.querySelector('aside');
        if (aside) {
          aside.addEventListener('mouseleave', this.collapseIfNeeded);
        }
      });
    }

    // Cerramos otros submenús para que no se abran varios a la vez (opcional)
    Object.keys(this.submenuOpen).forEach(key => {
      if (key !== menu) this.submenuOpen[key] = false;
    });

    // Alternamos el submenú solicitado
    this.submenuOpen[menu] = !this.submenuOpen[menu];
  }

  collapseIfNeeded = () => {
    if (this.submenuWasCollapsed) {
      this.collapsed = true;
      // Cerramos todos los submenús
      Object.keys(this.submenuOpen).forEach(key => this.submenuOpen[key] = false);
      this.submenuWasCollapsed = false;
      this.collapsedChange.emit(this.collapsed);

      const aside = document.querySelector('aside');
      if (aside) {
        aside.removeEventListener('mouseleave', this.collapseIfNeeded);
      }
    }
  };

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.classList.toggle('dark', this.isDarkMode);
  }
}
