
import { AuthService } from '../../services/auth.service'; 
import { Component, OnInit, ViewEncapsulation, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import { UserAcessAuth } from "../../../helpers/user-access.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    usuario: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required),
  })


  // submit() {
  //   this.service.login(this.loginForm.value).subscribe(res => {
  //     if (res) {
  //       console.log('Logado com sucesso!' + res);
  //     }
  //   })
  // }


  /**
   * Constructor
   *
   * @param {FuseConfigService} _fuseConfigService
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    // private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private routerLink: Router,
    private service: AuthService,
    private _snackBar: MatSnackBar,
    private userAccess: UserAcessAuth
  ) {
    // Configure the layout
    // this._fuseConfigService.config = {
    //   layout: {
    //     navbar: {
    //       hidden: true
    //     },
    //     toolbar: {
    //       hidden: true
    //     },
    //     footer: {
    //       hidden: true
    //     },
    //     sidepanel: {
    //       hidden: true
    //     }
    //   }
    // };
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.routerLink.navigateByUrl('');
    }
  }

  login() {
    if (this.loginForm.valid) {
      var resp = this.service
        .login(this.loginForm.value)
        .pipe(take(1))
        .subscribe(this._subscribeAction(), err => {
          if (err === "Conflict") {
            this._snackBar.open("Login/Senha inválidos! Por favor, tente novamente!", "", {
              duration: 2800,
              panelClass: 'snack-error'
            })
          }
          // } else if (err.error === 'UserDisabledException ') {
          //   this._snackBar.open("Foram encontrados problema na sua identificação, entre em contato com nossa equipe de atendimento ao cliente.", "", {
          //     duration: 2800,
          //     panelClass: 'snack-error'
          //   })
          // } else {
          //   this._snackBar.open("Login/Senha inválidos! Por favor, tente novamente!", "", {
          //     duration: 2800,
          //     panelClass: 'snack-error'
          //   })
          // }

        }
        );
    } else {
      this._snackBar.open("Informações inválidas! Tente novamente.", "", {
        duration: 2800,
        panelClass: 'snack-error'
      });
    }
  }

  private _subscribeAction(): (value: any) => void {
    return res => {
      this.service.setToken(JSON.stringify(res.token));
      this.service.login(this.loginForm.value).subscribe(res => {
        if (res) {
          if (res.token && res.user) {
            this.service.setUser({
              usuario: JSON.stringify(res.user.nome)
            })
          }
          this.service.autenticadoSource.next(true);
        }
        this.routerLink.navigateByUrl('/test');
      })
    }
  }
}