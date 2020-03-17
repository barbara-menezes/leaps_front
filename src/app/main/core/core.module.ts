import { CoreRoutes } from "./core.routing";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StudentsComponent } from './students/students.component';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        StudentsComponent,
        RouterModule.forChild(CoreRoutes),
        ReactiveFormsModule,
        FormsModule
    ],

    declarations: [StudentsComponent]
})
export class CoreModule { }
