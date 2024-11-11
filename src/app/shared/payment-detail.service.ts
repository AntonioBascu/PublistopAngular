import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Pago } from './payment-detail.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  url: string = environment.apiUrl + '/Pagos'
  pagos: Pago[] = []
  DatosFormulario: Pago = new Pago()

  constructor(private http: HttpClient) { }

  getPagos()
  {
    this.http.get(this.url)
      .subscribe({
        next: res => { this.pagos = res as Pago[] },
        error: err => { console.log(err) }
      })
  }

  postPago()
  {
    return this.http.post(this.url, this.DatosFormulario)
  }

  putPago() {
    return this.http.put(this.url + '/' + this.DatosFormulario.id, this.DatosFormulario)
  }

  deletePago(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
