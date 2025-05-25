import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() collapsed = false;                      // Recibe estado de colapso del padre
  @Output() collapsedChange = new EventEmitter<boolean>(); // Emite cambios al padre

  submenuOpen = false;
  isDarkMode = false;
  private submenuWasCollapsed = false;

  constructor(public auth: AuthService) {}

  toggleSidebar() {
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed);

    // Si colapsamos el sidebar, cerramos el submenú también
    if (this.collapsed) {
      this.submenuOpen = false;
    }
  }

  toggleSubmenu() {
    // Si el sidebar está colapsado, lo expandimos temporalmente
    if (this.collapsed) {
      this.submenuWasCollapsed = true;
      this.collapsed = false;
      this.collapsedChange.emit(this.collapsed);

      // Esperamos al siguiente ciclo de renderizado y añadimos evento para volver a colapsar
      setTimeout(() => {
        const aside = document.querySelector('aside');
        if (aside) {
          aside.addEventListener('mouseleave', this.collapseIfNeeded);
        }
      });
    }

    this.submenuOpen = !this.submenuOpen;
  }

  // Método que colapsa el sidebar si fue abierto temporalmente
  collapseIfNeeded = () => {
    if (this.submenuWasCollapsed) {
      this.collapsed = true;
      this.submenuOpen = false;
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
