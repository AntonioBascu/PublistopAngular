import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AutenticacionService } from './services/autenticacion.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const autorizacionInterceptor: HttpInterceptorFn = (req, next) => {
  const autServicio = inject(AutenticacionService)
  const router = inject(Router)
  const toastr = inject(ToastrService)

  if (autServicio.estaLogeado()) {
    const reqClonada = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + autServicio.obtenerToken())
    })
    return next(reqClonada).pipe(
      tap({
        error: (error: any) => {
          if (error.status === 401) {
            autServicio.eliminarToken();
            setTimeout(() => {
              toastr.info('Por favor, inicia sesión otra vez', 'Ha expirado la sesión.');
            }, 1500);
            router.navigateByUrl('/login');
          }
          else if (error.status === 403) {
            toastr.error('No tiene permisos para acceder a esta página', 'Error de autorización');
          }
        }
      })
    );
  }
  else return next(req);

};
