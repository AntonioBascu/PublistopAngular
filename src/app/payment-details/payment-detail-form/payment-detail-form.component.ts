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
  constructor(public service: PaymentDetailService, private toastr: ToastrService) { }

  onSubmit(form: NgForm) {

    if (form.valid) {
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
  }

  resetearFormulario(form: NgForm) {
    form.form.reset();
    this.service.DatosFormulario = new Pago();
  }
}
