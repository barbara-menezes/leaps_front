import { Routes } from '@angular/router'
import { LoginComponent } from './main/authentication/login/login.component'
import { StudentsComponent } from './main/core/students/students.component'


export const ROUTES: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'students',
        component: StudentsComponent
    }
]