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

  comptesBy_href(hrefCte) {
    return this.http.get(this.host + hrefCte);
  }

  comptesBy_ID(idClient) {
    return this.http.get(this.host + 'apiRest/compte/comptesClient/' + idClient);
  }

  addCompte(cteData) {
    const token = this.authService.getTokenStorage();
    return this.http.post(this.host + 'apiRest/compte/addCte/', cteData, {headers: new HttpHeaders({Authorization: token})});
  }
}
