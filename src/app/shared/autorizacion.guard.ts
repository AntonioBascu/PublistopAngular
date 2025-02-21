import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutenticacionService } from './services/autenticacion.service';

export const autorizacionGuard: CanActivateFn = (route, state) => {
  const authService = inject(AutenticacionService);
  const router = inject(Router)

  if (authService.estaLogeado()) {
    const claimReq = route.data['claimReq'] as Function;

    if (claimReq) {
      const claims = authService.obtenerClaims();
      if (!claimReq(claims)) {
        router.navigateByUrl("/accesoDenegado")

        return false;
      }
      return true;
    }
    return true;
  }
  else
  {
    router.navigateByUrl("/login")

    return false;
  }
};
