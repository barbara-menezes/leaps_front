import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { TestService } from 'src/app/main/services/test.service';
import { NgxNotificationMsgService, NgxNotificationStatusMsg } from 'ngx-notification-msg';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-teste-form',
  templateUrl: './teste-form.component.html',
  styleUrls: ['./teste-form.component.scss']
})
export class TesteFormComponent implements OnInit {

  id: any;
  codigo: any;


  constructor(private service: TestService,
    private ngxService: NgxUiLoaderService,
    private readonly ngxNotificationMsgService: NgxNotificationMsgService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar) { }

  form = new FormGroup({
    nome: new FormControl('', Validators.required),
    codigo: new FormControl('', [Validators.required]),
    status: new FormControl('', Validators.required)
  })

  ngOnInit() {
    this.codigo = this.route.snapshot.paramMap.get("codigo");
    this.id = this.route.snapshot.paramMap.get("id");
    if (!!this.codigo) {
      this.service.findOne(this.codigo).subscribe(res => {
        if (res.length === 1) {
          let teste = res[0];
          this.form.get('nome').setValue(teste[0].nome);
          this.form.get('codigo').setValue(teste[0].codigo);
          this.form.get('status').setValue(teste[0].status)
        }
      })
    }
  }

  saveOrUpdate(): void {
    if (this.form.valid) {
      if (this.id === null) {
        this.service.createteste(this.form.value).toPromise().then(res => {
          if (res) {
            this.ngxNotificationMsgService.open({
              status: NgxNotificationStatusMsg.SUCCESS,
              header: 'Parabéns!',
              msg: `O teste ${res.teste.nome} foi cadastrado com sucesso!`,
              delay: 3500
            });
            this.router.navigateByUrl('/test')
          }
        })
      } else {
        this.service.update(this.form.value, this.id).toPromise().then(res => {
          if (res) {
            this.ngxNotificationMsgService.open({
              status: NgxNotificationStatusMsg.INFO,
              header: 'Ebaa!',
              msg: `O teste ${this.form.get('nome').value} foi atualizado com sucesso!`,
              delay: 3500
            });
            this.router.navigateByUrl('/test')
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
    this.router.navigateByUrl('/test');
  }
}
