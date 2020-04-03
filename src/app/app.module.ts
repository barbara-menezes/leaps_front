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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './main/authentication/login/login.component';
import { SubjectFormComponent } from './main/core/subject/subject-form/subject-form.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { CommonModule } from '@angular/common';
import { SubjectComponent } from './main/core/subject/subject.component';
import { StudentComponent } from './main/core/student/student.component';
import { TesteComponent } from './main/core/teste/teste.component';
import { StudentFormComponent } from './main/core/student/student-form/student-form.component';
import { TesteFormComponent } from './main/core/teste/teste-form/teste-form.component';

const appRoutes: Routes = [
  {
    path: "",
    loadChildren: './main/core/core.module#CoreModule'
  }
];
/* para aplicar meta-dados em uma classe, atrib, método */
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AuthenticationComponent,
    LoginComponent,
    SubjectFormComponent,
    SubjectComponent,
    StudentComponent,
    TesteComponent,
    StudentFormComponent,
    TesteFormComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    RouterModule.forRoot(ROUTES),
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxUiLoaderModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
