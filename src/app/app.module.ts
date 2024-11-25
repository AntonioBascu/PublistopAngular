import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

//app
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagoComponent } from './pago/pago.component';
import { FormularioPagoComponent } from './pago/formulario-pago/formulario-pago.component';
import { ArticuloComponent } from './articulo/articulo.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { FormularioRegistroComponent } from './usuario/formulario-registro/formulario-registro.component';
import { MenuComponent } from './layout/menu/menu.component';

//Angular material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    PagoComponent,
    FormularioPagoComponent,
    ArticuloComponent,
    UsuarioComponent,
    FormularioRegistroComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    ReactiveFormsModule 
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
