import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { PagoComponent } from './pago/pago.component';
import { ArticuloComponent } from './articulo/articulo.component';
import { FormularioLoginComponent } from './usuario/formulario-login/formulario-login.component';
import { FormularioRegistroComponent } from './usuario/formulario-registro/formulario-registro.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { autorizacionGuard } from './shared/autorizacion.guard';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '', component: UsuarioComponent,
    children: [
      { path: 'login', component: FormularioLoginComponent },
      { path: 'registro', component: FormularioRegistroComponent }]
  },
  {
    path: '', component: MainLayoutComponent, canActivate: [autorizacionGuard],
    canActivateChild: [autorizacionGuard],
    children: [
      {
        path: 'dashboard', component: DashboardComponent
      },
      {
        path: 'articulo', component: ArticuloComponent,
        data: { claimReq: (claims: any) => claims.role == 'Admin' }
      },
      { path: 'pagos', component: PagoComponent },
      { path: 'accesoDenegado', component: ForbiddenComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
