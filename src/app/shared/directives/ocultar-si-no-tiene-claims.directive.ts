import { Directive, ElementRef, Input, OnInit } from "@angular/core";
import { AutenticacionService } from "../services/autenticacion.service";


@Directive({
  selector: '[appOcultarSiNoTieneClaims]'
})
export class OcultarSiNoTieneClaimsDirective implements OnInit {
  @Input('appOcultarSiNoTieneClaims') claimsReq!: Function;

  constructor(private autService: AutenticacionService,
    private elementRef: ElementRef) { }

  ngOnInit() {
    const claims = this.autService.obtenerClaims();

    if (!this.claimsReq(claims)) {
      this.elementRef.nativeElement.style.display = 'none';
    }
  }

}
