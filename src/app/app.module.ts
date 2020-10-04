import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './components/client/client.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ComptesService } from './services/comptes.service';
import { OperationsService } from './services/operations.service';
import { ClientService } from './services/client.service';
import { ComptesComponent } from './components/comptes/comptes.component';
import { OperationsComponent } from './components/operations/operations.component';
import { AuthComponent } from './components/auth/auth.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NewCompteComponent } from './components/comptes/new-compte/new-compte.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ParametresClientComponent } from './components/parametres-client/parametres-client.component';

const appRoutes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'client', component: ClientComponent },
  { path: 'comptes', component: ComptesComponent },
  { path: 'comptes/:params', component: ComptesComponent },
  { path: 'newCompte/:params', component: NewCompteComponent },
  { path: 'operations', component: OperationsComponent },
  { path: 'operations/:params', component: OperationsComponent },
  { path: 'parametersClient', component: ParametresClientComponent },
  { path: 'parametersClient/:params', component: ParametresClientComponent },
  { path: 'pageNotFound', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/pageNotFound', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    ComptesComponent,
    OperationsComponent,
    AuthComponent,
    NewCompteComponent,
    PageNotFoundComponent,
    ParametresClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'}),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule],
  providers: [ComptesService, OperationsService, ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
