import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NoAutorizadoComponent } from './pages/no-autorizado/no-autorizado.component'; // ⬅️ ¡Este import es clave!
import { authGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'no-autorizado', component: NoAutorizadoComponent }, // ⬅️ Aquí agregas la ruta
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [authGuard],
    children: [
      { path: '', component: DashboardComponent, data: { role: '' } },
      // otras rutas protegidas
    ]
  },
  { path: '**', redirectTo: 'login' } // ⬅️ Ruta comodín (opcional pero recomendable)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
