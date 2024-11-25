import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './formulario-registro.component.html',
  styleUrl: './formulario-registro.component.css'
})
export class FormularioRegistroComponent {
  constructor() { }
  public  formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    nombre: [''],
    email: [''],
    password: [''],
    confirmarPassword: ['']
  })

  onSubmit() {
    console.log(this.form.value)
  }

}
