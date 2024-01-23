
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = 'https://historias.azurewebsites.net/api/v1/portafolio/usuarios/search';

  constructor(private http: HttpClient) {}


  searchUsers(query: string): Observable<any[]> {
    console.log("0101010101010101010100101");
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + token
    });

    const url = `${this.apiUrl}?query=${query}`;
    return this.http.get<any[]>(url, { headers });
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
