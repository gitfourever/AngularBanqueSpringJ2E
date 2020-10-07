import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthentificationService} from './authentification.service';
import {toBase64String} from '@angular/compiler/src/output/source_map';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private host = 'http://localhost:8080/';

  constructor(private http: HttpClient,
              private auth: AuthentificationService
  ) { }


  getClientShort(email) {
    // console.log(email);
    return this.http.get(this.host + 'apiRest/client/clientByEmail/' + email);
  }

  getClientFull(idClient) {
    return this.http.get(this.host + 'apiRest/client/clientById/' + idClient);
  }

  getClientOnline(email) {
    // console.log(JSON.stringify({email: email}));
    return this.http.get(this.host + 'apiRest/clientOnline/' + email);
  }

  updatePasswordClientOnline(clientOnlineData) {
    // console.log(clientOnlineData);
    const token = this.auth.getTokenStorage();
    // console.log(token);
    return this.http.put(this.host + 'apiRest/clientOnline/updatePassword/', clientOnlineData,
    {observe: 'response', headers: new HttpHeaders({Authorization: token})});
  }
}
