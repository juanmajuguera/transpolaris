import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [authGuard], // protege rutas hijas
    children: [
      { path: '', component: DashboardComponent, data: { role: 'admin' } },
      // aquí puedes agregar más rutas con diferentes roles
      // { path: 'user-page', component: UserPageComponent, data: { role: 'user' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
