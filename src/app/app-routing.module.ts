import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { PagoComponent } from './pago/pago.component';
import { ArticuloComponent } from './articulo/articulo.component';

const routes: Routes = [
  { path: 'articulo', component: ArticuloComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'pagos', component: PagoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
