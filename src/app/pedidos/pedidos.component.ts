import { Component } from '@angular/core';
import { PedidoService } from '../shared/services/pedido.service';
import { Pedido } from '../shared/models/pedido.model';
import { Estado } from '../shared/enums/estado.enum';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent {
  constructor(private servicio: PedidoService) { }

  pedidos: Pedido[] = []
  filtro: string = ''
  pedidosFiltrados: Pedido[] = []

  ngOnInit() {
    this.servicio.getPedidos()
      .subscribe({
        next: res => {
          this.pedidos = res as Pedido[]
          this.pedidosFiltrados = this.pedidos
        },
        error: err => { console.log(err) }
      })
  }

  obtenerEstado(id: number) {
    return Estado[id];
  }

  aplicarFiltro() {

    //if (!this.filtro.trim()) return;

    const filtroLower = this.filtro.toLowerCase();

    this.pedidosFiltrados = this.pedidos.filter(p =>
      p.id.toString().includes(this.filtro) ||
      p.cliente?.toLowerCase().includes(filtroLower) ||
      //p.estado?.toLowerCase().includes(filtroLower) ||
      //(p.entregaMax && (p.entregaMax | date: 'dd/MM/yyyy').toString().includes(filtroLower)) ||
      (p.lineasPedido?.some((l: any) =>
        l.articulo?.toLowerCase().includes(filtroLower) ||
        l.cantidad?.toString() == (this.filtro)
      ))
    );
  }
}
