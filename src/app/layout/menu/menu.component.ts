import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../shared/services/autenticacion.service';
import { UsuarioService } from '../../shared/services/usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  constructor(private router: Router,
    public autServicio: AutenticacionService,
    private usuarioServicio: UsuarioService) { }

  nombreUsuario: string = ''

  ngOnInit(): void {
    if (this.autServicio.estaLogeado()) {
      this.usuarioServicio.getPerfilUsuario().subscribe({
        next: (res: any) => { this.nombreUsuario = res.nombre },
        error: err => console.log('Error intentando obtener el nombre del usuario.', err)
      });
    }
  }

  cerrarSesion() {
    this.autServicio.eliminarToken()

    this.router.navigateByUrl('/login');
  }

}
