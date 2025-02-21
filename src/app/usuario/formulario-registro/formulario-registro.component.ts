import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { AutenticacionService } from '../../shared/services/autenticacion.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './formulario-registro.component.html',
  styleUrl: './formulario-registro.component.css'
})
export class FormularioRegistroComponent implements OnInit {
  constructor(
    private servicioAutenticacion: AutenticacionService,
    private toastr: ToastrService,
    private router: Router) { }

  public formBuilder = inject(FormBuilder);
  private formEnviado = false;

  ngOnInit(): void {
    if (this.servicioAutenticacion.estaLogeado())
      this.router.navigateByUrl('/pedidos')
  }

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
    password: ['', [Validators.required, Validators.minLength(8)/*, Validators.pattern(/(?=.*[^a-zA-Z0-9 ])/)*/]],
    confirmarPassword: ['']
  }, { validators: [this.validadorCoincidenciaContraseña/*, this.validadorNumeroYMayuscula*/] })

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
          },
          error: err => {
            if (err.error.errors) {
              err.error.errors.forEach((x: any) => {
                switch (x.code) {
                  case "DuplicateEmail":
                    this.toastr.error('El email ya existe.', 'Creación de usuario')
                    break
                  case "DuplicateUserName":
                    this.toastr.error('El nombre de usuario ya existe.', 'Creación de usuario')
                    break;
                  default:
                    this.toastr.error('Error en la creación de cuenta.', 'Creación de usuario')
                    break;
                }
              }
              );
            }
            else console.log(err)
          }
        })
    }
  }

  mostrarErrorValidacion(nombreControl: string): boolean {
    const control = this.form.get(nombreControl);

    return Boolean(control?.invalid) && (this.formEnviado || Boolean(control?.dirty));
  }

  resetearFormulario() {
    this.form.reset();
    this.formEnviado = false;
  }
}
