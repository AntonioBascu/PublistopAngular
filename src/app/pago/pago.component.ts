import { Component, OnInit } from '@angular/core';
import { PagoService } from '../shared/services/pago.service';
import { Pago } from '../shared/models/pago.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.css'
})
export class PagoComponent implements OnInit {

  constructor(public service: PagoService, private toastr: ToastrService) { }

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
