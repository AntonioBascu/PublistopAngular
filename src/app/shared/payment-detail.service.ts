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

  constructor(private http: HttpClient) { }

  getPagos()
  {
    this.http.get(this.url)
      .subscribe({
        next: res => { this.pagos = res as Pago[] },
        error: err => { console.log(err) }
      })
  }
}
