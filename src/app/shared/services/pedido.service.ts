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
}
