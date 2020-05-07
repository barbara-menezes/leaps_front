import { Routes } from '@angular/router'
import { LoginComponent } from './main/authentication/login/login.component'
import { SubjectFormComponent } from './main/core/subject/subject-form/subject-form.component'
import { SubjectComponent } from './main/core/subject/subject.component';
import { TesteFormComponent } from './main/core/teste/teste-form/teste-form.component';
import { TesteComponent } from './main/core/teste/teste.component';
import { StudentComponent } from './main/core/student/student.component';
import { StudentFormComponent } from './main/core/student/student-form/student-form.component';
import { EmprestimoComponent } from './main/core/emprestimo/emprestimo.component';
import { EmprestimoFormComponent } from './main/core/emprestimo/emprestimo-form/emprestimo-form.component'
import { CadastroComponent } from './main/core/cadastro/cadastro.component';
import { CadastroFormComponent } from './main/core/cadastro/cadastro-form/cadastro-form.component';

export const ROUTES: Routes = [
    // {
    //     path: '',
    //     component: MainComponent
    // },
    {
        path: '',
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
    {
        path: 'test/test-form/edit/:codigo/:id',
        component: TesteFormComponent,
    },
    {
        path: 'test',
        component: TesteComponent
    },
    {
        path: 'student',
        component: StudentComponent
    },
    {
        path: 'student/student-form',
        component: StudentFormComponent
    },
    {
        path: 'student/student-form/edit/:codigo/:id',
        component: StudentFormComponent,
    },
    {
        path: 'emprestimo',
        component: EmprestimoComponent
    },
    {
        path: 'emprestimo/emprestimo-form',
        component: EmprestimoFormComponent
    },
    {
        path: 'emprestimo/emprestimo-form/edit/:codigo/:id',
        component: EmprestimoFormComponent,
    },
    {
        path: 'cadastro',
        component: CadastroComponent
    },
    {
        path: 'cadastro/cadastro-form',
        component: CadastroFormComponent
    },
    {
        path: 'cadastro/cadastro-form/edit/:cadastro/:id',
        component: StudentFormComponent,
    },
]


