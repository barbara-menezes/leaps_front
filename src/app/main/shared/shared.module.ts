import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, AngularSvgIconModule, FlexLayoutModule],
  exports: [HeaderComponent]
})
export class SharedModule { }
