import { Component } from '@angular/core';
import { PagoService } from '../../shared/services/pago.service';
import { NgForm } from '@angular/forms';
import { Pago } from '../../shared/models/pago.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-formulario-pago',
  templateUrl: './formulario-pago.component.html',
  styleUrl: './formulario-pago.component.css'
})
export class FormularioPagoComponent {

  enviado: Boolean = false;

  constructor(public service: PagoService, private toastr: ToastrService) { }

  onSubmit(form: NgForm) {

    this.enviado = true;
    if (form.valid) {
      if (this.service.DatosFormulario.id == 0)
        this.insertarDatos(form)
      else
        this.actualizarDatos(form)
    }
  }

  insertarDatos(form: NgForm) {
    this.service.postPago()
      .subscribe({
        next: res => {
          this.service.pagos = res as Pago[];
          this.resetearFormulario(form);
          this.toastr.success('¡Pago creado con éxito!', 'Registro de pagos');
        },
        error: err => { console.log(err) }
      })
  }

  actualizarDatos(form: NgForm) {
    this.service.putPago()
      .subscribe({
        next: res => {
          this.service.pagos = res as Pago[];
          this.resetearFormulario(form);
          this.toastr.info('¡Pago actualizado con éxito!', 'Registro de pagos');
        },
        error: err => { console.log(err) }
      })
  }

  resetearFormulario(form: NgForm) {
    form.form.reset();
    this.service.DatosFormulario = new Pago();
    this.enviado = false;
  }
}
