import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { PagoComponent } from './pago/pago.component';
import { ArticuloComponent } from './articulo/articulo.component';
import { FormularioLoginComponent } from './usuario/formulario-login/formulario-login.component';
import { FormularioRegistroComponent } from './usuario/formulario-registro/formulario-registro.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'articulo', component: ArticuloComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '', component: UsuarioComponent, children: [
      { path: 'login', component: FormularioLoginComponent },
      { path: 'registro', component: FormularioRegistroComponent }]
  },
  { path: 'pagos', component: PagoComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
