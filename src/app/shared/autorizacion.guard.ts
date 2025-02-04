import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutenticacionService } from './services/autenticacion.service';

export const autorizacionGuard: CanActivateFn = (route, state) => {
  const authService = inject(AutenticacionService);
  const router = inject(Router)

  if (authService.estaLogeado()) {
    return true;
  }
  else
  {
    router.navigateByUrl("/usuario/login")

    return false;
  }
};
