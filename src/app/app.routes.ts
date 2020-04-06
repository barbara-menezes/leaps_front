import { Routes } from '@angular/router'
import { MainComponent } from './main/main.component'
import { LoginComponent } from './main/authentication/login/login.component'
import { SubjectFormComponent } from './main/core/subject/subject-form/subject-form.component'
import { SubjectComponent } from './main/core/subject/subject.component';
import { TesteFormComponent } from './main/core/teste/teste-form/teste-form.component';
import { TesteComponent } from './main/core/teste/teste.component';
import { StudentComponent } from './main/core/student/student.component';

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
    {
        path: 'test/test-form',
        component: TesteFormComponent
    },
    // {
    //     path: 'test/test-form/edit/:codigo/:id',
    //     component: SubjectFormComponent,
    // },
    {
        path: 'test',
        component: TesteComponent
    },
    {
        path: 'student',
        component: StudentComponent
    },
]