import { Component, OnInit } from '@angular/core';
import {ComptesService} from '../../services/comptes.service';
import {OperationsService} from '../../services/operations.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {

  private numCte = undefined;
  private compteData: {};
  private nomClient = undefined;
  private extraitCte = false;
  private newOperation = false;

  constructor(private compteService: ComptesService,
              private operationService: OperationsService,
              private router: Router,
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.route.snapshot.params.params !== undefined) {
      this.nomClient = JSON.parse(atob(this.route.snapshot.params.params)).nomClient;
      this.numCte = JSON.parse(atob(this.route.snapshot.params.params)).numCte;
      this.getCompte(this.numCte);
    }
  }

  getCompte(numCte) {
    // console.log('numCte operations: ', numCte);
    this.compteData = this.compteService.compte(numCte).subscribe(value => {
      // console.log(value);
      this.compteData = value;
    }, error => {
      console.log(error);
      console.log(error.error.message);
    });
  }

  operationCte(target: EventTarget) {
    // console.log(target['value']);
    // console.log(this.compteData);

  }

  addOperation() {
    this.newOperation = true;
  }

  cancelOperation() {
    this.newOperation = false;
  }
}
