import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../../services/authentification.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private authService: AuthentificationService){}

  ngOnInit() {}
}
