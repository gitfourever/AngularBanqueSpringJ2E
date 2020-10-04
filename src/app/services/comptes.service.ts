import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthentificationService} from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class ComptesService {

  private host = 'http://localhost:8080/';

  constructor(private http: HttpClient,
              private authService: AuthentificationService
  ) { }

  compte(numCte) {
    return this.http.get(this.host + 'apiRest/compte/' + numCte);
  }

  comptes(hrefCte) {
    return this.http.get(this.host + hrefCte);
  }

  addCompte(cteData) {
    // console.log(cteData);
    const token = this.authService.getTokenStorage();
    return this.http.post(this.host + 'apiRest/compte/', cteData, {observe: 'response', headers: new HttpHeaders({Authorization: token})});
  }
}
