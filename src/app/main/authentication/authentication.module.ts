import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';


@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        // Authentication
        ReactiveFormsModule,
        FormsModule
    ]
})
export class AuthenticationModule {

}
