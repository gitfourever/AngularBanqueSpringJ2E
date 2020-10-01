import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ComptesModule {

  numCte: string;

  typeCompte: string;

  solde: number;

  dataCreation: Date;

  operations: object;
}
