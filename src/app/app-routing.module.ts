import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { PagoComponent } from './pago/pago.component';
import { ArticuloComponent } from './articulo/articulo.component';
import { FormularioLoginComponent } from './usuario/formulario-login/formulario-login.component';
import { FormularioRegistroComponent } from './usuario/formulario-registro/formulario-registro.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { autorizacionGuard } from './shared/autorizacion.guard';

const routes: Routes = [
  { path: 'articulo', component: ArticuloComponent, canActivate: [autorizacionGuard] },
  { path: '', redirectTo: '/usuario/login', pathMatch: 'full' },
  { path: 'usuario', component: UsuarioComponent, children: [
      { path: 'login', component: FormularioLoginComponent },
      { path: 'registro', component: FormularioRegistroComponent }]
  },
  { path: 'pagos', component: PagoComponent, canActivate: [autorizacionGuard] },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
