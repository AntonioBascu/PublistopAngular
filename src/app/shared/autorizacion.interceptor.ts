import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AutenticacionService } from './services/autenticacion.service';

export const autorizacionInterceptor: HttpInterceptorFn = (req, next) => {
  const autServicio = inject(AutenticacionService)

  if (autServicio.estaLogeado()) {
    const reqClonada = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + autServicio.obtenerToken())
    })
    return next(reqClonada);
  }
  else return next(req);

};
