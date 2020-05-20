import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { SubjectService } from 'src/app/main/services/subject.service';
import { NgxNotificationMsgService, NgxNotificationStatusMsg } from 'ngx-notification-msg';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TestService } from 'src/app/main/services/test.service';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.scss']
})
export class SubjectFormComponent implements OnInit {

  id: any;
  codigo: any;
  listTestes: any = [];

  constructor(private service: SubjectService,
    private ngxService: NgxUiLoaderService,
    private readonly ngxNotificationMsgService: NgxNotificationMsgService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private testService: TestService) { }

  form = new FormGroup({
    nome_disciplina: new FormControl('', Validators.required),
    codigo: new FormControl('', [Validators.required, Validators.minLength(6)]),
    periodo: new FormControl('', Validators.required),
    turno: new FormControl('', [Validators.required])
  })

  testes: any = [];

  ngOnInit() {
    this.testService.listAll().subscribe(res => {
      if (res) {
        this.listTestes = res.teste;
      }
    })

    this.codigo = this.route.snapshot.paramMap.get("codigo");
    this.id = this.route.snapshot.paramMap.get("id");
    if (!!this.codigo) {
      this.service.findOne(this.codigo).subscribe(res => {
        if (res.length === 1) {
          let disciplina = res[0];
          this.form.get('nome_disciplina').setValue(disciplina[0].nome_disciplina);
          this.form.get('codigo').setValue(disciplina[0].codigo);
          this.form.get('periodo').setValue(disciplina[0].periodo);
          this.form.get('turno').setValue(disciplina[0].turno)
        }
      })
    }
  }

  saveOrUpdate(): void {
    if (this.form.valid && this.testes.length > 0 ) {
      if (this.id === null) {
        this.service.createSubject(this.form.value).toPromise().then(res => {
          if (res) {
            this.ngxNotificationMsgService.open({
              status: NgxNotificationStatusMsg.SUCCESS,
              header: 'Parabéns!',
              msg: `A disciplina ${res.disciplina.nome_disciplina} foi cadastrada com sucesso!`,
              delay: 3500
            });
            this.router.navigateByUrl('/subject')
          }
        })
      } else {
        this.service.update(this.form.value, this.id).toPromise().then(res => {
          if (res) {
            this.ngxNotificationMsgService.open({
              status: NgxNotificationStatusMsg.INFO,
              header: 'Ebaa!',
              msg: `A disciplina ${this.form.get('nome_disciplina').value} foi atualizada com sucesso!`,
              delay: 3500
            });
            this.router.navigateByUrl('/subject')
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
    this.router.navigateByUrl('/subject')
  }

  adicionarTeste(teste) {
    if (teste) {
      this.testes.push(teste.id);
    }
  }

}

