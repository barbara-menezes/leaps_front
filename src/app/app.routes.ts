import { Routes } from '@angular/router'
import { MainComponent } from './main/main.component'
import { LoginComponent } from './main/authentication/login/login.component'
import { SubjectFormComponent } from './main/core/subject/subject-form/subject-form.component'
import { SubjectComponent } from './main/core/subject/subject.component';

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
    },
    {
        path: 'subject/subject-form/edit/:codigo/:id',
        component: SubjectFormComponent,
    },
    {
        path: 'subject',
        component: SubjectComponent
    },
]