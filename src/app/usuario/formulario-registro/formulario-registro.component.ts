import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { AutenticacionService } from '../../shared/services/autenticacion.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './formulario-registro.component.html',
  styleUrl: './formulario-registro.component.css'
})
export class FormularioRegistroComponent {
  constructor(private servicioAutenticacion: AutenticacionService, private toastr: ToastrService) { }

  public formBuilder = inject(FormBuilder);
  private formEnviado = false;


  //Validadores
  validadorCoincidenciaContraseña: ValidatorFn = (control: AbstractControl): null => {
    const password = control.get('password');
    const confirmarPassword = control.get('confirmarPassword');

    if (password && confirmarPassword && password.value != confirmarPassword.value)
      confirmarPassword?.setErrors({ passwordNoCoincide: true })
    else
      confirmarPassword?.setErrors(null)

    return null;
  }

  validadorNumeroYMayuscula: ValidatorFn = (control: AbstractControl): null => {
    const password = control.get('password');

    // Validar que contiene número y mayúscula
    const hasNumber = /\d/.test(password?.value);
    const hasUppercase = /[A-Z]/.test(password?.value);

    if (!hasNumber)
      password?.setErrors({ sinNumero: true })
    if (!hasUppercase)
      password?.setErrors({ sinMayuscula: true })

    return null;
  }

  form = this.formBuilder.group({
    userName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/(?=.*[^a-zA-Z0-9 ])/)]],
    confirmarPassword: ['']
  }, { validators: [this.validadorCoincidenciaContraseña, this.validadorNumeroYMayuscula] })

  onSubmit() {
    this.formEnviado = true;

    if (this.form.valid) {
      this.servicioAutenticacion.crearUsuario(this.form.value)
        .subscribe({
          next: (res: any) => {
            if (res.succeeded) {
              this.resetearFormulario()
              this.toastr.success('¡Usuario creado con éxito!', 'Creación de usuario')
            }
            else console.log(res)
          },
          error: err => console.log(err)
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
