import { Component, inject, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PedidoService } from '../../shared/services/pedido.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Pedido } from '../../shared/models/pedido.model';
import { not } from 'rxjs/internal/util/not';

@Component({
  selector: 'app-formulario-pedido',
  templateUrl: './formulario-pedido.component.html',
  styleUrl: './formulario-pedido.component.css'
})
export class FormularioPedidoComponent {

  constructor(private servicioPedidos: PedidoService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  @Input() id = -1;

  ngOnInit() {
    if (this.id != -1) {
      this.servicioPedidos.getPedido(Number(this.id))
        .subscribe({
          next: res => {
            this.pedidoForm = this.crearPedido(res)

            console.log(res)
            //let pedido = res as Pedido;
            //this.pedidoForm.patchValue({
            //  cliente: pedido.cliente,
            //  entregaMax: pedido.EntregaMax,
            //  lineasPedido: pedido.LineasPedido
            //})
          },
          error: err => { console.log(err) }
        })
    }
  }

  private formBuilder = inject(FormBuilder);

  pedidoForm = this.crearPedido()

  crearPedido(pedido?: any): FormGroup {
    return this.formBuilder.group({
      cliente: [pedido?.cliente ?? '', Validators.required],
      entregaMax: [pedido?.entregaMax ? pedido?.entregaMax.split('T')[0] : null],
      lineasPedido: this.formBuilder.array(
        pedido?.lineasPedido && pedido.lineasPedido.length > 0 ?
          pedido.lineasPedido.map((linea: any) => this.crearLineaPedido(linea))
          : [this.crearLineaPedido()] // si no hay lineas, arranca con una vacía
      )
    })
  }

  crearLineaPedido(linea?: any): FormGroup {
    return this.formBuilder.group({
      id: [linea?.id ?? 0],
      articulo: [linea?.articulo, Validators.required],
      cantidad: [linea?.cantidad, Validators.required],
      tinta: [linea?.tinta ?? ''],
      situacionGrabacion: [linea?.situacionGrabacion ?? '']
    })
  }

  get lineasPedido() {
    return this.pedidoForm.get('lineasPedido') as FormArray;
  }

  agregarLineaPedido(): void {
    this.lineasPedido.push(this.crearLineaPedido());
  }

  eliminarLineaPedido(index: number): void {
    this.lineasPedido.removeAt(index);
  }

  esInvalido(nombreControl: string, index?: number): boolean;
  esInvalido(nombreControl: string): boolean;
  esInvalido(nombreControl: string, index?: number): boolean {

    if (index !== undefined) {
      return Boolean(this.lineasPedido.at(Number(index)).get(nombreControl)?.invalid)
        && Boolean(this.lineasPedido.at(Number(index)).get(nombreControl)?.touched);
    }
    else {
      return Boolean(this.pedidoForm.get(nombreControl)?.invalid)
        && Boolean(this.pedidoForm.get(nombreControl)?.touched);
    }
  }

  onSubmit(): void {
    if (this.pedidoForm.valid) {

      if (this.id == -1) {
        this.post(this.pedidoForm.value)
      }
      else {
        this.put(this.id, this.pedidoForm.value)
      }

    } else {
      this.pedidoForm.markAllAsTouched(); // Marcar todos los campos para mostrar errores
    }
  }

  put(id: number, datosFormulario: any) {
    this.servicioPedidos.putPedido(id, datosFormulario).subscribe({
      next: (res: any) => {
        this.toastr.success('¡Pedido editado con éxito!', 'Edición de pedido')
      },
      error: err => {
        console.log(err)

        this.router.navigateByUrl('/pedidos');
        this.toastr.error('¡Error editando el pedido', 'Edición de pedido')
      }
    })
  }

  post(datosFormulario: any) {
    this.servicioPedidos.postPedido(datosFormulario).subscribe({
      next: (res: any) => {
        this.router.navigateByUrl('/pedidos');
        //this.pedidoForm.reset()
        this.toastr.success('¡Pedido creado con éxito!', 'Creación de pedido')

      },
      error: (err: any) => {
        this.toastr.error('Error creando el pedido', 'Creación de pedido')
      }
    })
  }
}
