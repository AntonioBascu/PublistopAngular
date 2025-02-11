import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { TOKEN_KEY } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  constructor(private http: HttpClient) { }

  url: string = environment.apiUrl

  crearUsuario(datosFormulario: any) {
    return this.http.post(this.url + '/signup', datosFormulario)
  }

  iniciarSesion(datosFormulario: any) {
    return this.http.post(this.url + '/signin', datosFormulario)
  }

  estaLogeado()
  {
    return this.obtenerToken() != null ? true : false
  }

  eliminarToken()
  {
    localStorage.removeItem(TOKEN_KEY)
  }

  obtenerToken()
  {
    return localStorage.getItem(TOKEN_KEY)
  }

  guardarToken(token: string)
  {
    localStorage.setItem(TOKEN_KEY, token)
  }

  obtenerClaims()
  {
    return JSON.parse(atob(this.obtenerToken()!.split('.')[1]))
  }
}
