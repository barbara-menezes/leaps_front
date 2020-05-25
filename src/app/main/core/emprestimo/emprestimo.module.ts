import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgxNotificationMsgModule } from 'ngx-notification-msg'
import { BrowserModule } from '@angular/platform-browser';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { EmprestimoComponent } from './emprestimo.component';
import { EmprestimoFormComponent } from './emprestimo-form/emprestimo-form.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [EmprestimoComponent, EmprestimoFormComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    AngularSvgIconModule,
    NgxNotificationMsgModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgxUiLoaderModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatTabsModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatFormFieldModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EmprestimoModule { }
