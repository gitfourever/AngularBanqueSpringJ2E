import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class ClientModule {

  public idClient: number;

  public nomClient: string;

  public emailClient: string;

  public _links: {
    self: { href: string },
    comptes: { href: string },
    employe: { href: string }
  };
}
