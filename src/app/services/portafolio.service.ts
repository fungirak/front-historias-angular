import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISkill } from '../interfaces/iskill';
import { IAcercaDe } from '../interfaces/iacercade';
import { IEducacion } from '../interfaces/ieducacion';
import { IExperiencia } from '../interfaces/iexperiencia';
import { IProyecto } from '../interfaces/iproyecto';
import { IUsuario } from '../interfaces/iusuario';


@Injectable({
  providedIn: 'root'
})
export class PortafolioService {

   headers: HttpHeaders = new HttpHeaders();
   url: string;
   urlInputSearchUsers: string = "https://historias.azurewebsites.net/api/v1/portafolio/usuarios/search";



  constructor(private http:HttpClient, private route: ActivatedRoute) {
    const token = localStorage.getItem('token');

    this.url = "https://historias.azurewebsites.net/api/v1/portafolio/";
    this.route.params.subscribe(params => {
      const userName = params['nombreUsuario']; // suponiendo que el nombre de usuario está en la URL como un parámetro llamado 'usuario'
      const userPortafolioUrl = this.url + userName;
      console.log("URL USUARIO: ", userName);
      // Aquí puedes hacer cualquier otra cosa que necesites con la URL dinámica
    });

      // Verifica si el token existe antes de construir el encabezado
      if (token) {
        this.headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
      } else {
        // Manejar el caso en el que el token no está presente (puede mostrar un mensaje o redirigir a iniciar sesión)
        console.error('Token no disponible. El usuario debe iniciar sesión.');
      }

  }




  // *********************************************************************
  // ********  |   METHOD'S GET PORTAFOLIO(Usuario)    | *****************
  // *********************************************************************

   obtenerPortafolioDeUsuario() {
    return this.http.get<any>( this.url);
  }

  // *********************************************************************
  // **************   |   METHOD'S GET ALL    | **************************
  // *********************************************************************

  obtenerDatosUsuarios(nombreUsuario: string):Observable<IUsuario> {
    return this.http.get<IUsuario>( this.url + "?query=" + nombreUsuario , { headers: this.headers} );
  }

  obtenerDatosAcercaDe(nombreUsuario: string):Observable<IAcercaDe> {
    return this.http.get<IAcercaDe>( this.url + nombreUsuario + '/acerca_de', { headers: this.headers} );
  }

  obtenerDatosEducacion(nombreUsuario: string):Observable<IEducacion> {
    return this.http.get<IEducacion>( this.url + nombreUsuario + '/educacion', { headers: this.headers}  );
  }


  obtenerDatosExperiencias(nombreUsuario: string):Observable<IExperiencia> {
    return this.http.get<IExperiencia>( this.url + nombreUsuario +'/experiencia', { headers: this.headers});
  }

  obtenerDatosProyectos(nombreUsuario: string):Observable<IProyecto> {
    return this.http.get<IProyecto>( this.url + nombreUsuario + '/proyectos', { headers: this.headers});
  }

  obtenerDatosSkills(nombreUsuario: string):Observable<ISkill> {
    return this.http.get<ISkill>( this.url + nombreUsuario + '/skills', { headers: this.headers});
  }

  // *********************************************************************
  // **************   |   METHOD'S GET ONE    | **************************
  // *********************************************************************

  obtenerOneDatosAcercaDe(nombreUsuario: string, id: number):Observable<any> {
    return this.http.get<any>( this.url + nombreUsuario + '/acerca_de/' + id, { headers: this.headers} );
  }

  obtenerOneDatosEducacion(nombreUsuario: string, id: number):Observable<IEducacion> {
    return this.http.get<IEducacion>( this.url + nombreUsuario + '/educacion/' + id, { headers: this.headers});
  }

  obtenerOneDatosExperiencia(nombreUsuario: string, id: number):Observable<IExperiencia> {
    return this.http.get<IExperiencia>( this.url  + nombreUsuario +  '/experiencias/' + id, { headers: this.headers});
  }

  obtenerOneDatosProyecto(nombreUsuario: string, id: number):Observable<IProyecto> {
    return this.http.get<IProyecto>( this.url  + nombreUsuario +  '/proyectos/' + id, { headers: this.headers});
  }

  obtenerOneDatosSkill(nombreUsuario: string, id: number):Observable<ISkill> {
    return this.http.get<ISkill>( this.url +  nombreUsuario + '/skills/' + id, { headers: this.headers});
  }



  // *********************************************************************
  // **************   |   METHOD'S POST    | ******************************
  // *********************************************************************

  postAcercaDe( nombreUsuario: string, AcercaDe: any ):Observable<any> {
    let AcercaDeJSON = JSON.stringify(AcercaDe);
    return this.http.post<any>( this.url +  nombreUsuario + '/acerca_de', AcercaDeJSON , { headers: this.headers} );
  }

  postEducacion( nombreUsuario: string, Educacion: IEducacion ):Observable<IEducacion> {
    return this.http.post<IEducacion>( this.url  + nombreUsuario +  '/educacion', Educacion , { headers: this.headers} );
  }

  postExperiencia( nombreUsuario: string, Experiencia: IExperiencia ):Observable<IExperiencia> {
    return this.http.post<IExperiencia>( this.url  + nombreUsuario + '/experiencias', Experiencia , { headers: this.headers} );
  }

  postProyecto(nombreUsuario: string,  Proyecto: IProyecto ):Observable<IProyecto> {
    return this.http.post<IProyecto>( this.url +  nombreUsuario + '/proyectos', Proyecto , { headers: this.headers} );
  }

  postSkill( nombreUsuario: string, Skill: ISkill ):Observable<ISkill> {
    return this.http.post<ISkill>( this.url  + nombreUsuario + '/skills', Skill , { headers: this.headers} );
  }

  // *********************************************************************
  // **************   |   METHOD'S PUT    | ******************************
  // *********************************************************************

  putAcercaDe( nombreUsuario: string, AcercaDe: any, id: Number ):Observable<any> {
    return this.http.put<any>( this.url  + nombreUsuario + '/acerca_de/' + id, AcercaDe , { headers: this.headers} );
  }

  putExperiencia(nombreUsuario: string,  Experiencia: IExperiencia, i: Number  ):Observable<IExperiencia> {
    return this.http.put<IExperiencia>( this.url  + nombreUsuario +  '/experiencias/' + i, Experiencia , { headers: this.headers} );
  }

  putEducacion(nombreUsuario: string,  Educacion: IEducacion, id: Number  ):Observable<IEducacion> {
    return this.http.put<IEducacion>( this.url  + nombreUsuario + '/educacion/' + id, Educacion , { headers: this.headers} );
  }

  putProyecto( nombreUsuario: string, Proyecto: IProyecto, id: Number  ):Observable<IProyecto> {
    return this.http.put<IProyecto>( this.url  + nombreUsuario + '/proyectos/' + id, Proyecto , { headers: this.headers} );
  }

  putSkill( nombreUsuario: string, Skill: ISkill, id: Number  ):Observable<ISkill> {
    return this.http.put<ISkill>( this.url  + nombreUsuario + '/skills/' + id, Skill , { headers: this.headers} );
  }


  // *********************************************************************
  // **************   |   METHOD'S DELETE    | ***************************
  // *********************************************************************

  deleteAcercaDe( nombreUsuario: string, id: Number ):Observable<any> {
    return this.http.delete<any>( this.url  + nombreUsuario + '/acerca_de/' + id , { headers: this.headers} );
  }

  deleteEducacion(nombreUsuario: string, id: Number ):Observable<IEducacion> {
    return this.http.delete<IEducacion>( this.url  + nombreUsuario + '/educacion/' + id , { headers: this.headers} );
  }

  deleteExperiencia( nombreUsuario: string, id: Number ):Observable<IExperiencia> {
    return this.http.delete<IExperiencia>( this.url  + nombreUsuario + '/experiencias/' + id ,  { headers: this.headers} );
  }

  deleteProyecto( nombreUsuario: string, id: Number ):Observable<IProyecto> {
    return this.http.delete<IProyecto>( this.url  + nombreUsuario + '/proyectos/' + id ,  { headers: this.headers} );
  }

  deleteSkill( nombreUsuario: string, id: Number ):Observable<ISkill> {
    return this.http.delete<ISkill>( this.url  + nombreUsuario +  '/skills/' + id ,  { headers: this.headers} );
  }


}
