import { Routes } from "@angular/router";
import { StudentsComponent } from './students/students.component';

export const CoreRoutes: Routes = [
    {
        path: "/students",
        component: StudentsComponent
    },
];
