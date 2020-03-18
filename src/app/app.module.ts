import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AuthenticationComponent } from './main/authentication/authentication.component';
import { Routes, RouterModule } from '@angular/router';

import { ROUTES } from './app.routes'

import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { SharedModule } from './main/shared/shared.module';
import { LoginComponent } from './security/login/login.component';

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
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    RouterModule.forRoot(ROUTES),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
