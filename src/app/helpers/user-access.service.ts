import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { AuthService } from '../main/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class UserAcessAuth {
    constructor(private loginService: AuthService) { }

    async adminCanAccess() {
        return await this.loginService.getUsuario().toPromise().then((res) => {
            if (res && res.roles) {
                return res.roles.indexOf("ROLE_ADMIN") !== -1;
            }
            return false;
        });
    }
}