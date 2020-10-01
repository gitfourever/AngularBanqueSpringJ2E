import {Component, OnInit} from '@angular/core';
import {ComptesService} from '../../services/comptes.service';
import {AuthentificationService} from '../../services/authentification.service';
import {ClientService} from '../../services/client.service';

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
              private authService: AuthentificationService
  ) { }

   ngOnInit() {
     this.getClient();
  }

  getClient() {
    this.clientService.getClientShort(this.authService.isConnected().username).subscribe(value => {
      this.clientService.getClientFull(value['idClient']).subscribe(client => {
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



  // ************************************************ //
  // continuer avec les suivants ...
  // ************************************************ //

  addCompte() {

  }

  deleteCompte() {

  }

  updatePassClientOnline() {

  }
}
