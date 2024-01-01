
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = 'http://localhost:8080/api/usuarios/search';

  constructor(private http: HttpClient) {}

  searchUsers(query: string): Observable<any[]> {
    const url = `${this.apiUrl}?query=${query}`;
    return this.http.get<any[]>(url);
  }
}
