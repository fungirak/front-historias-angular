import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {


  urlLogin="http://localhost:8080/auth/login";
  urlNuevo="http://localhost:8080/auth/nuevo";
  usuario: BehaviorSubject<any>;


  constructor(private http:HttpClient) {
    console.log("El servicio de autenticación está corriendo.");
    this.usuario = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('token') || '{}'));
  }

  login(credenciales:any):Observable<any>{
    return this.http.post(this.urlLogin , credenciales);
   /* return this.http.post(this.url, credenciales).pipe(map(data => {
      console.log("Archivo Autenticacion Service , credenciales: ", credenciales);
      console.log("Archivo Autenticacion Service , mapeo de data: ", data);
      this.usuario.next(data);
      return data;
    }))
    */
  }

  register(credenciales:any):Observable<any>{
    return this.http.post(this.urlNuevo , credenciales);
  }

  token(){
    console.log("Archivo Autenticacion Service, token(): ", sessionStorage.getItem('token') );
    return  sessionStorage.getItem('token');
  }

  setToken(token:string): void {
    sessionStorage.setItem('token', token);
  }

  removeToken(): void {
    sessionStorage.removeItem('token');
    console.log("Token removido, desde archivo autentication service", sessionStorage.getItem('token'));
  }

  // Obtener el nombre de usuario desde la sesión
  getUsuarioFromSession() {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      const tokenPayload = this.parseJwt(storedToken);
      return tokenPayload ? tokenPayload.username : null;
    }
    return null;
  }

   // Método para obtener el nombre de usuario
   getNombreUsuario(): Observable<string> {
    return this.usuario.asObservable();
  }

   // Función para decodificar el token JWT
   private parseJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c: string) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }



}
