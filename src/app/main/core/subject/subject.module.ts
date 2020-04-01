import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SubjectComponent } from './subject.component';
import { SubjectFormComponent } from './subject-form/subject-form.component';


@NgModule({
  declarations: [SubjectComponent, SubjectFormComponent],
  imports: [
    CommonModule,
    AngularSvgIconModule
  ]
})
export class SubjectModule { }
