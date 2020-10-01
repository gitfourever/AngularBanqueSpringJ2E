import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private host = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }


  getClientShort(email) {
      return this.http.get(this.host + 'apiRest/clientByEmail/' + email);
  }

  getClientFull(idClient) {
      return this.http.get(this.host + 'apiRest/clientById/' + idClient);
  }
}
