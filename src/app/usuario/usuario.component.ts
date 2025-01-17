import { Component } from '@angular/core';
import { animate, query, style, transition, trigger } from '@angular/animations';
import { ChildrenOutletContexts } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css',
  animations: [
    trigger('opacidadRouter', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0 }),
          animate('1s ease-in-out', style({ opacity: 1 }))
        ], { optional: true })
      ])
    ])
  ]
})
export class UsuarioComponent {

  constructor(private context: ChildrenOutletContexts) { }

  getUrl() {
    return this.context.getContext('primary')?.route?.url;
  }
}
