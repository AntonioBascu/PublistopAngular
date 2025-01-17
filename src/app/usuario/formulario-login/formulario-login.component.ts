import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AutenticacionService } from '../../shared/services/autenticacion.service';
import { formatCurrency } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './formulario-login.component.html',
  styleUrl: './formulario-login.component.css'
})
export class FormularioLoginComponent {

  constructor(
    private toastr: ToastrService,
    private servicioAutenticacion: AutenticacionService,
    private router: Router
    )
  {}

  private formBuilder = inject(FormBuilder)
  private formEnviado = false;

  form = this.formBuilder.group({
    userNameOrEmail: ['', Validators.required],
    password: ['', Validators.required],
  })

  onSubmit() {
    this.formEnviado = true;

    if (this.form.valid) {
      this.servicioAutenticacion.iniciarSesion(this.form.value)
        .subscribe({
          next: (respuesta: any) => {
            localStorage.setItem('token', respuesta.token)

            this.router.navigateByUrl('/dashboard');
            this.toastr.success('¡Usuario verificado con éxito!', 'Inicio de sesión correcto')
          },
          error: err => {
            if (err.status == 400) {
              this.toastr.error('Email o contraseña incorrectos.', 'Inicio de sesión fallido')
            }
            else {
              this.toastr.error('Error al intentar iniciar sesión.', 'Inicio de sesión fallido')

              console.log(err)
            }
          }

        })

    }
  }

  mostrarErrorValidacion(nombreControl: string): boolean {
    const control = this.form.get(nombreControl);

    return Boolean(control?.invalid) && (this.formEnviado || Boolean(control?.touched));
  }

  resetearFormulario() {
    this.form.reset();
    this.formEnviado = false;
  }
}
