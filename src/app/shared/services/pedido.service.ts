import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  constructor(private http: HttpClient) { }

  url: string = environment.apiUrl;

  getPedidos() {
    return this.http.get(this.url + '/pedidos')
  }

  getPedido(id: number) {
    return this.http.get(this.url + '/pedidos/' + id)
  }

  putPedido(id: number, datosFormulario: any) {
    return this.http.put(this.url + '/pedidos/' + id, datosFormulario)
  }

  postPedido(datosFormulario: any) {
    return this.http.post(this.url + '/pedidos', datosFormulario)
  }

}
