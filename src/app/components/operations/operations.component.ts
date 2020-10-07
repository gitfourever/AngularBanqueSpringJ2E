import { Component, OnInit } from '@angular/core';
import {ComptesService} from '../../services/comptes.service';
import {OperationsService} from '../../services/operations.service';
import {ActivatedRoute, Router} from '@angular/router';
import {error} from '@angular/compiler/src/util';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {

  private client = {
    idClient : undefined,
    nomClient : undefined,
    compte : {
      numCte: undefined,
      compteData: null,
      ctesClient: null
    },
    operations : {
      RefOp: undefined,
      typeOp: undefined,
      operationsCte: null,
      operationDisplay: null,
      errorMessage: ''
    },
    booleans: {
      operVerRet: false,
      operVirement: false,
      opersCte: false,
      operDisplay: false
    }
  };

  constructor(private compteService: ComptesService,
              private operationService: OperationsService,
              private router: Router,
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.route.snapshot.params.params !== undefined) {
      this.client.nomClient = JSON.parse(atob(this.route.snapshot.params.params)).nomClient;
      this.client.compte.numCte = JSON.parse(atob(this.route.snapshot.params.params)).numCte;
      this.client.idClient = JSON.parse(atob(this.route.snapshot.params.params)).idClient;
      this.getCompte(this.client.compte.numCte);
    }
  }

  getCompte(numCte) {
    this.compteService.compte(numCte).subscribe(cte => {
      this.client.compte.compteData = cte;
    }, errorCte => {
      console.log(error);
      console.log(errorCte.error.message);
    });
  }

  addOperation(value) {

    console.log(value);
    value['numCte01'] = this.client.compte.compteData['numCte'];
    switch (this.client.operations.typeOp) {
      case 'VE': {
        this.operationService.verser(value).subscribe(operation => {
          this.stateBooleans();
          this.getOperations();
          window.location.reload(true);
        }, errorOp => {
          console.log(errorOp);
        });
        break;
      }
      case 'RE': {
        this.operationService.retirer(value).subscribe(operation => {
          this.stateBooleans();
          this.getOperations();
          window.location.reload(true);
        }, errorOp => {
          console.log(errorOp);
        });
        break;
      }
      case 'VI': {
        console.log(value);
        this.operationService.virement(value).subscribe(operation => {
          this.stateBooleans();
          this.getOperations();
          window.location.reload(true);
        }, errorOp => {
          console.log(errorOp);
          this.client.operations.errorMessage = errorOp.error.message;
        });
        break;
      }
      default: {
        console.log('Error addOperation !!!');
      }
    }
  }

  cancelOperation() {
    this.stateBooleans();
  }

  stateBooleans(versementRetrait = false, virement = false, opersCte = false, operDispaly = false) {
    this.client.booleans.operVerRet = versementRetrait;
    this.client.booleans.operVirement = virement;
    this.client.booleans.opersCte = opersCte;
    this.client.booleans.operDisplay = operDispaly;
  }

  typeOperation(e) {
    this.client.operations.typeOp = e.value;

    switch (e.value) {
      case 'VE': {
        this.stateBooleans(true, false, false, false);
        break;
      }
      case 'RE': {
        this.stateBooleans(true, false, false, false);
        break;
      }
      case 'VI': {
        this.stateBooleans(false, true, false, false);
        this.compteService.comptesBy_ID(this.client.idClient).subscribe(ctes => {
          this.client.compte.ctesClient = ctes;
        }, errorCtes => {
          console.log(errorCtes);
        });
        break;
      }
      default: {
        console.log('Error typeOperation !!!');
      }
    }
  }

  operationDisplay(operationsData) {
    this.stateBooleans(false, false, false, true);
    console.log(operationsData);
    this.client.operations.operationDisplay = operationsData;
  }

  updateOperation(op) {
    console.log(op);
  }

  getOperations() {
    this.operationService.getOperations(this.client.compte.compteData['numCte']).subscribe(operations => {
      // console.log(operations);
      this.client.operations.operationsCte = operations;
      this.stateBooleans(false, false, true, false);
    }, errorOp =>  {
      console.log(errorOp);
    });
  }
}
