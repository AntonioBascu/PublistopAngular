import { LineaPedido } from "./lineaPedido.model"

export class Pedido {
  id: number = 0
  cliente: string = ""
  estado: string = "" 
  entregaMax: Date = new Date()
  lineasPedido: LineaPedido[] = []
}
