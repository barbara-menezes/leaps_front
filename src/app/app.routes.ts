import { Routes } from '@angular/router'
import { LoginComponent } from './main/authentication/login/login.component'
import { SubjectComponent } from './main/core/subject/subject.component'
import { MainComponent } from './main/main.component'
import { SubjectFormComponent } from './main/core/subject/subject-form/subject-form.component'


export const ROUTES: Routes = [
    {
        path: '',
        component: MainComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'subject/subject-form',
        component: SubjectFormComponent
    }
]