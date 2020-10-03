import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientService} from '../../services/client.service';

@Component({
  selector: 'app-parametres-client',
  templateUrl: './parametres-client.component.html',
  styleUrls: ['./parametres-client.component.css']
})
export class ParametresClientComponent implements OnInit {

  private emailClient = undefined;
  private clientOnline = null;
  private messageError = undefined;

  constructor(private route: ActivatedRoute,
              private clientService: ClientService,
              private router: Router
  ) { }

  ngOnInit() {
    this.emailClient = JSON.parse(atob(this.route.snapshot.params.params));
    this.goToFormChangePassword();
  }

  goToFormChangePassword() {
    // console.log(this.emailClient);
    this.clientService.getClientOnline(this.emailClient).subscribe(value => {
      // console.log(value);
      this.clientOnline = value;
    }, error => {
      console.log(error);
      this.messageError = error.error.message;
    });
  }

  updatePassword(clientOnlineData) {
    // console.log(clientOnlineData);
    this.clientService.updatePasswordClientOnline(clientOnlineData).subscribe(value => {
      console.log(value);
    }, error => {
      console.log(error);
      this.messageError = error.error.message;
    });
  }

}
