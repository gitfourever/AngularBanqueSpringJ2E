import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private host = 'http://localhost:8080/';
  private tokenDataJWT = {
    tokenOriginal: null,
    tokenCoded: null,
    tokenDecoded: null,
    phrase001: 'jfsDFr_lSjTGg-DGe42.1sdfBds', // this.randomPhrase(17), // Math.random().toString(36), // .substr(17),
    phrase002: 'sdfGT-ezrDSD4_52sfdf_83qZS.', // this.randomPhrase(17), // Math.random().toString(36), // .slice(5),
    phrase003: 'dsfd_dff.651ds-sezGhHJes.fs' // this.randomPhrase(17), // Math.random().toString(36), // .substring(2, 7)
  };
  private clientOnlineData = {
    username: null,
    roles: null,
    expiration: null,
    connected: false
  };

  constructor(private http: HttpClient, private router: Router) { }

  onLogin(dataUser): Observable<any> {
    return this.http.post(this.host + 'login', dataUser, {observe: 'response'});
  }

  tokenJWTsave(token: any) {
    this.tokenDataJWT.tokenCoded = token.substr(0, 30) + this.tokenDataJWT.phrase001 +
      token.substr(30, 70) + this.tokenDataJWT.phrase002 +
      token.substr(100, 170) + this.tokenDataJWT.phrase003 + token.substr(170);
    localStorage.setItem('tokenStorage', btoa(this.tokenDataJWT.tokenCoded));
  }

  tokenJWTload() {
    if (localStorage.getItem('tokenStorage') !== null) {
      const storage = atob(localStorage.getItem('tokenStorage'));
      this.tokenDataJWT.tokenDecoded = storage
        .replace(this.tokenDataJWT.phrase001, '')
        .replace(this.tokenDataJWT.phrase002, '')
        .replace(this.tokenDataJWT.phrase003, '');

      const decodeJWT = jwt_decode(this.tokenDataJWT.tokenDecoded);

      this.clientOnlineData.username = decodeJWT['sub'];
      this.clientOnlineData.roles = decodeJWT['roles'];
      this.clientOnlineData.expiration = decodeJWT['exp'];
      this.clientOnlineData.connected = true;
    }
  }

  isConnected() {
    if (localStorage.getItem('tokenStorage') !== null) {
      this.tokenJWTload();
    } else {
      this.onLogout();
    }
    return this.clientOnlineData;
  }

  randomPhrase(longueur) {
    let phraseRandom;
    for ( phraseRandom = ''; phraseRandom.length < longueur;) {
      phraseRandom += '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz_-./?+='[(Math.random() * 60) | 0];
    }
    return phraseRandom;
  }

  onLogout() {
    localStorage.removeItem('tokenStorage');
    this.clientOnlineData.connected = false;
    return this.clientOnlineData;
  }
}
