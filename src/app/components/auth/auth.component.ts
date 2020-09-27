import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../../services/authentification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  username = 'client001@email.com';
  password = '1234';

  constructor(private auth: AuthentificationService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(dataUser: any): void {
    this.auth.onLogin(dataUser).subscribe(value => {
      this.auth.tokenJWTsave(value.headers.get('authorization'));
      this.router.navigateByUrl('/comptes', { skipLocationChange: true}); // .then(r => {console.log(r)});
    }, error => {
      console.log(error);
    });
  }

}