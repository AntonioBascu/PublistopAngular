import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

//app
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './layout/menu/menu.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ArticuloComponent } from './articulo/articulo.component';
import { PagoComponent } from './pago/pago.component';
import { FormularioPagoComponent } from './pago/formulario-pago/formulario-pago.component';
import { FormularioRegistroComponent } from './usuario/formulario-registro/formulario-registro.component';
import { FormularioLoginComponent } from './usuario/formulario-login/formulario-login.component';
import { PrimerErrorValidacionPipe } from './shared/pipes/primer-error-validacion.pipe';
import { DashboardComponent } from './dashboard/dashboard.component';
import { autorizacionInterceptor } from './shared/autorizacion.interceptor';

//Angular material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';

@NgModule({
  declarations: [
    AppComponent,
    PagoComponent,
    FormularioPagoComponent,
    ArticuloComponent,
    UsuarioComponent,
    FormularioRegistroComponent,
    MenuComponent,
    PrimerErrorValidacionPipe,
    FormularioLoginComponent,
    DashboardComponent,
    MainLayoutComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ positionClass: 'toast-top-center' }),
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    ReactiveFormsModule
  ],
  providers: [provideHttpClient(withInterceptors([autorizacionInterceptor]))],
  bootstrap: [AppComponent]
})
export class AppModule { }
