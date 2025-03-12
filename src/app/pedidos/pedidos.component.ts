import { Component } from '@angular/core';
import { PedidoService } from '../shared/services/pedido.service';
import { Pedido } from '../shared/models/pedido.model';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent {
  constructor(private servicio: PedidoService) { }

  pedidos: Pedido[] = []

  ngOnInit() {
    this.servicio.getPedidos()
      .subscribe({
        next: res => { this.pedidos = res as Pedido[] },
        error: err => { console.log(err) }
      })
  }
}
