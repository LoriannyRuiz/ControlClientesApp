import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private apiUrl = 'https://localhost:7012';

  constructor(private http: HttpClient) { }

  getAllClients(): Observable<any[]> {
    let Link = this.apiUrl + "/api/Clientes"
    return this.http.get<any[]>(Link)
  }
  postClient(client : any): Observable<any[]> {
    let Link = this.apiUrl + "/api/Clientes"
    return this.http.post<any[]>(Link, client)
  }
  putClient(id: number, client : any): Observable<any[]> {
    let Link = this.apiUrl + "/api/Clientes/"+id
    return this.http.put<any[]>(Link, client)
  }
  deleteClient(id: number): Observable<any[]> {
    let Link = this.apiUrl + "/api/Clientes/"+id
    return this.http.delete<any[]>(Link)
  }

}
