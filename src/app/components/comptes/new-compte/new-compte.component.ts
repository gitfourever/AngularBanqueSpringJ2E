import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ComptesService} from '../../../services/comptes.service';

@Component({
  selector: 'app-new-compte',
  templateUrl: './new-compte.component.html',
  styleUrls: ['./new-compte.component.css']
})
export class NewCompteComponent implements OnInit {

  private showForm = false;
  private showDecouvert = false;
  private showTaux = false;
  private idClient = undefined;

  constructor(private router: Router,
              private compteService: ComptesService,
              private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.idClient = JSON.parse(atob(this.route.snapshot.paramMap.get('params')));
  }

  addCompte(value) {
    this.compteService.addCompte(value).subscribe(cteData => {
      // console.log(cteData);
      this.router.navigateByUrl('/operations', {skipLocationChange: true});
    }, error => {
      console.log(error);
    });
  }

  typeCompte(value) {
    if (value.typeCte === 'op') {
      this.showForm = false;
    } else if (value.typeCte === 'CC') {
      this.showForm = true;
      this.showDecouvert = true;
      this.showTaux = false;
    } else if (value.typeCte === 'CE') {
      this.showForm = true;
      this.showDecouvert = false;
      this.showTaux = true;
    }
  }


}
