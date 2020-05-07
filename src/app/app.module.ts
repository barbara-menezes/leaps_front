import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';

import { ROUTES } from './app.routes'

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from './main/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './main/authentication/login/login.component';
import { SubjectFormComponent } from './main/core/subject/subject-form/subject-form.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { CommonModule } from '@angular/common';
import { SubjectComponent } from './main/core/subject/subject.component';
import { StudentComponent } from './main/core/student/student.component';
import { TesteComponent } from './main/core/teste/teste.component';
import { StudentFormComponent } from './main/core/student/student-form/student-form.component';
import { TesteFormComponent } from './main/core/teste/teste-form/teste-form.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EmprestimoComponent } from './main/core/emprestimo/emprestimo.component';
import { EmprestimoFormComponent } from './main/core/emprestimo/emprestimo-form/emprestimo-form.component';
import { CadastroComponent } from './main/core/cadastro/cadastro.component';
import { CadastroFormComponent } from './main/core/cadastro/cadastro-form/cadastro-form.component';
import { LoginModule } from './main/authentication/login/login.module';
import { JwtInterceptorService } from './helpers/jwt-interceptor.service';
import { RequestInterceptorService } from './helpers/http-interceptor.service';

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
    SubjectFormComponent,
    SubjectComponent,
    StudentComponent,
    TesteComponent,
    StudentFormComponent,
    TesteFormComponent,
    EmprestimoComponent,
    EmprestimoFormComponent,
    CadastroComponent,
    CadastroFormComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    SharedModule,
    RouterModule.forRoot(ROUTES),
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxUiLoaderModule,
    MatSnackBarModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt' },
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptorService, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
