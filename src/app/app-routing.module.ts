import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { PagoComponent } from './pago/pago.component';
import { ArticuloComponent } from './articulo/articulo.component';
import { FormularioLoginComponent } from './usuario/formulario-login/formulario-login.component';
import { FormularioRegistroComponent } from './usuario/formulario-registro/formulario-registro.component';
import { autorizacionGuard } from './shared/autorizacion.guard';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { claimsReq } from './shared/utilities/claimsReq';
import { PedidosComponent } from './pedidos/pedidos.component';

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
        path: 'pedidos', component: PedidosComponent,
        data: { claimReq: claimsReq.Taller }
      },
      {
        path: 'articulo', component: ArticuloComponent,
        data: { claimReq: claimsReq.Admin }
      },
      {
        path: 'pagos', component: PagoComponent,
        data: { claimReq: claimsReq.Oficina }
      },
      { path: 'accesoDenegado', component: ForbiddenComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
