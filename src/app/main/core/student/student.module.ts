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
import { StudentComponent } from './student.component';
import { StudentFormComponent } from './student-form/student-form.component';


@NgModule({
  declarations: [StudentComponent, StudentFormComponent],
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

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StudentModule { }
