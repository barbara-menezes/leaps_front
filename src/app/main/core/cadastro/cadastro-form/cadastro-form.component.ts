import { Component, OnInit } from '@angular/core';
import { CadastroService } from 'src/app/main/services/cadastro.service';
import { NgxNotificationMsgService, NgxNotificationStatusMsg } from 'ngx-notification-msg';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-form',
  templateUrl: './cadastro-form.component.html',
  styleUrls: ['./cadastro-form.component.scss']
})
export class CadastroFormComponent implements OnInit {

  id: any;
  codigo: any;

  constructor(private service: CadastroService,
    private readonly ngxNotificationMsgService: NgxNotificationMsgService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar) { }

    form = new FormGroup({
      nome_usuario: new FormControl('', [Validators.required]),
      email: new FormControl('', Validators.required),
      matricula: new FormControl('', [Validators.required]),
      usuario: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required),
    })

  ngOnInit() {
    this.codigo = this.route.snapshot.paramMap.get("codigo");
    this.id = this.route.snapshot.paramMap.get("id");
    if (!!this.codigo) {
      this.service.findOne(this.codigo).subscribe(res => {
        if (res.length === 1) {
          let usuario = res[0];
          this.form.get('nome_usuario').setValue(usuario[0].nome_usuario);
          this.form.get('email').setValue(usuario[0].email);
          this.form.get('matricula').setValue(usuario[0].matricula);
          this.form.get('usuario').setValue(usuario[0].usuario);
        }
      })
    }
  }

  saveOrUpdate(): void {
    if (this.form.valid) {
      if (this.id === null) {
        this.service.createCadastro(this.form.value).toPromise().then(res => {
          if (res) {
            this.ngxNotificationMsgService.open({
              status: NgxNotificationStatusMsg.SUCCESS,
              header: 'Parabéns!',
              msg: `O(a) usuario(a) ${res.usuario.nome_usuario} foi cadastrado(a) com sucesso!`,
              delay: 3500
            });
            this.router.navigateByUrl('/cadastro')
          }
        })
      } else {
        this.service.update(this.form.value, this.id).toPromise().then(res => {
          if (res) {
            this.ngxNotificationMsgService.open({
              status: NgxNotificationStatusMsg.INFO,
              header: 'Ebaa!',
              msg: `O(a) usuario(a) ${this.form.get('nome_usuario').value} foi atualizado(a) com sucesso!`,
              delay: 3500
            });
            this.router.navigateByUrl('/cadastro')
          }
        })
      }
    } else {
      this.snackbar.open("Verifique se todos os campos obrigatórios foram preenchidos corretamente!", " ", {
        duration: 2800,
        panelClass: "snack-error"
      });
    }
  }

  voltar() {
    this.router.navigateByUrl('/cadastro')
  }

}
