import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'; // Importa aquí
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NoAutorizadoComponent } from './pages/no-autorizado/no-autorizado.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    DashboardComponent,
    SidebarComponent,
    NoAutorizadoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, // <-- Aquí lo agregas
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
