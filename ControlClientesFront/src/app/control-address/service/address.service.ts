import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {


  private apiUrl = 'https://localhost:7012';

  constructor(private http: HttpClient) { }

  getAllAddress(id: number): Observable<any[]> {
    let Link = this.apiUrl + "/api/Direcciones/Client/"+id
    return this.http.get<any[]>(Link )
  }
  postAddress(id: any, address : any): Observable<any[]> {
    let Link = this.apiUrl + "/api/Direcciones"
    return this.http.post<any[]>(Link, address)
  }
  putAddress(id: number, client : any): Observable<any[]> {
    let Link = this.apiUrl + "/api/Direcciones/"+id
    return this.http.put<any[]>(Link, client)
  }
  deleteAddress(id: number): Observable<any[]> {
    let Link = this.apiUrl + "/api/Direcciones/"+id
    return this.http.delete<any[]>(Link)
  }

}
