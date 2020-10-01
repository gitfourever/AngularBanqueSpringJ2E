import {Component, OnInit} from '@angular/core';
import {ComptesService} from '../../services/comptes.service';
import {AuthentificationService} from '../../services/authentification.service';
import {ClientService} from '../../services/client.service';
import {logger} from 'codelyzer/util/logger';
import {Router} from '@angular/router';

@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.css']
})
export class ComptesComponent implements OnInit {

  private clientOnline: any;
  private comptesClient: any;

  constructor(private compteService: ComptesService,
              private clientService: ClientService,
              private authService: AuthentificationService,
              private router: Router
  ) { }

   ngOnInit() {
     this.getClient();
  }

  getClient() {
    const emailClient = this.authService.isConnected().username;
    this.clientService.getClientShort(emailClient).subscribe(value => {
      const idClient = value['idClient'];
      this.clientService.getClientFull(idClient).subscribe(client => {
        this.clientOnline = client;
        this.getComptes();
      }, error => {
        console.log(error);
      });
    }, error => {
      console.error(error);
    });
  }

  getComptes() {
    const hrefCompteShort = 'apiRest/comptesByClient/' + this.clientOnline.idClient;
    this.compteService.comptes(hrefCompteShort).subscribe(value => {
      console.log(value);
      this.comptesClient = value;
    }, error => {
      console.log(error);
    });
  }

  newCompte() {
    this.router.navigateByUrl('/newCompte/' + btoa(JSON.stringify(this.clientOnline.idClient)), {skipLocationChange: true});
  }

  deleteCompte() {

  }

  updatePassClientOnline() {

  }
}
