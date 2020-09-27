import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from './services/authentification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularSpringBanqueMicroServices';

  constructor(private auth: AuthentificationService, private router: Router) {
    if (this.isConnected()) {
      this.router.navigateByUrl('/comptes', {skipLocationChange: true});
    } else {
      this.router.navigateByUrl('/login', {skipLocationChange: true});
    }
  }

  isConnected() {
    return this.auth.isConnected().connected;
  }

  seDeconnecter() {
    this.auth.onLogout();
    this.router.navigateByUrl('/login', {skipLocationChange: true});
  }

  isConnectedUser() {
    return this.auth.isConnected().username;
  }
}
