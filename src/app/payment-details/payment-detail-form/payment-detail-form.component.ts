import { Component } from '@angular/core';
import { PaymentDetailService } from '../../shared/payment-detail.service';
import { NgForm } from '@angular/forms';
import { Pago } from '../../shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styleUrl: './payment-detail-form.component.css'
})
export class PaymentDetailFormComponent {

  enviado: Boolean = false;

  constructor(public service: PaymentDetailService, private toastr: ToastrService) { }

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
