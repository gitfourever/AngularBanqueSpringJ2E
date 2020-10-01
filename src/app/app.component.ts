import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from './services/authentification.service';
import {Router} from '@angular/router';
import {ClientService} from './services/client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularSpringBanqueMicroServices';

  constructor(private authService: AuthentificationService,
              private clientService: ClientService,
              private router: Router) {
    if (this.isConnected()) {
      this.router.navigateByUrl('/operations', {skipLocationChange: true});
    } else {
      this.router.navigateByUrl('/login', {skipLocationChange: true});
    }
  }

  isConnected() {
    return this.authService.isConnected().connected;
  }

  seDeconnecter() {
    this.authService.onLogout();
    this.router.navigateByUrl('/login', {skipLocationChange: true});
  }

  isConnectedUser() {
    return this.authService.isConnected().username;
  }
}
