import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComptesService {

  private host = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  comptes(hrefCte) {
    return this.http.get(this.host + hrefCte);
  }
}
