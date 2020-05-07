import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() transparencia: BehaviorSubject<boolean>;
  flag: boolean;

  isLoged: boolean = false;

  constructor(
    private router: Router,
    private loginService: AuthService,
  ) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        // if (val.url.includes("pesquisar-voos") ||
        //   val.url === "/compra" ||
        //   val.url === "/meus-voos" ||
        //   val.url === "/usuario/alterar-senha" ||
        //   val.url === "/compra-realizada" ||
        //   val.url.includes("usuario")
        // ) {
        //   this.flag = false;
        // } else {
        this.flag = true;
        // }
      }
    })
  }

  ngOnInit() {
    // this.transparencia.subscribe(res => {
    //   this.flag = res
    // });

    this.loginService.autenticadoSource.subscribe(res => {
      this.isLoged = res;
    })

    if (localStorage.getItem('token') !== null) {
      this.isLoged = true;
    }
  }

  logout() {
    this.loginService.logout();
    this.router.navigateByUrl('');
  }

  redirect(route) {
    this.router.navigateByUrl('' + route)
  }

}
