import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

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
}
