import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AuthenticationComponent } from './main/authentication/authentication.component';
import { Routes } from '@angular/router';
import { SharedModule } from './main/shared/shared.module';

const appRoutes: Routes = [
  {
    path: "",
    loadChildren: './main/core/core.module#CoreModule'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AuthenticationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
