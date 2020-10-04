import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../../services/authentification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  emailClient = 'client001@email.com';
  password = '4321';
  private messageErreur = undefined;

  constructor(private auth: AuthentificationService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(dataUser) {
    this.auth.onLogin(dataUser).subscribe(value => {
      this.auth.tokenJWTsave(value.headers.get('authorization'));
      this.router.navigateByUrl('/operations', { skipLocationChange: true});
    }, error => {
      console.log(error);
      this.messageErreur = error.error.message;
    });
  }

}
