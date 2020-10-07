import { Injectable } from '@angular/core';
import {Route} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthentificationService} from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  private host = 'http://localhost:8080/';

  constructor(private http: HttpClient,
              private auth: AuthentificationService) { }

  verser(operationsData) {
    // console.log(operationsData);
    const token = this.auth.getTokenStorage();
    return this.http.put(this.host + 'apiRest/operations/versement', operationsData, {headers: new HttpHeaders({'Authorization': token})});
  }

  retirer(operationsData: any) {
    const token = this.auth.getTokenStorage();
    return this.http.put(this.host + 'apiRest/operations/retrait', operationsData, {headers: new HttpHeaders({'Authorization': token})});
  }

  virement(operationsData: any) {
    const token = this.auth.getTokenStorage();
    return this.http.put(this.host + 'apiRest/operations/virement', operationsData, {headers: new HttpHeaders({'Authorization': token})});
  }

  getOperations(numCte) {
    return this.http.get(this.host + 'apiRest/operations/compte/' + numCte);
  }
}
