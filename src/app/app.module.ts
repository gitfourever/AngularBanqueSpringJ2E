import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './components/client/client.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {ComptesService} from "./services/comptes.service";
import {OperationsService} from "./services/operations.service";
import {ClientService} from "./services/client.service";
import {ComptesComponent} from "./components/comptes/comptes.component";
import {OperationsComponent} from "./components/operations/operations.component";

const appRoutes: Routes = [
  //{ path: 'login', component: LoginComponent},
  { path: 'client', component: ClientComponent},
  { path: 'comptes', component: ComptesComponent},
  { path: 'operations', component: OperationsComponent}
  //{ path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    ComptesComponent,
    OperationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ComptesService, OperationsService, ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
