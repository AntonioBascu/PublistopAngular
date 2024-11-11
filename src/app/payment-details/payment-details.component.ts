import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from '../shared/payment-detail.service';
import { Pago } from '../shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export class PaymentDetailsComponent implements OnInit {

  constructor(public service: PaymentDetailService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.getPagos();
  }

  rellenarFormulario(pagoSeleccionado: Pago) {
    this.service.DatosFormulario = Object.assign({}, pagoSeleccionado);
  }

  eliminar(id: number) {
    if (confirm('¿Estas seguro que quieres eliminar este pago?')) {
      this.service.deletePago(id)
        .subscribe({
          next: res => {
            this.service.pagos = res as Pago[];
            this.toastr.error('¡Pago eliminado con éxito!', 'Registro de pagos');
          },
          error: err => { console.log(err) }
        });
    }
  }
}
