import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { SubjectService } from 'src/app/main/services/subject.service';
import { NgxNotificationMsgService, NgxNotificationStatusMsg } from 'ngx-notification-msg';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.css']
})
export class SubjectFormComponent implements OnInit {

  id: any;
  codigo: any;

  constructor(private service: SubjectService,
    private ngxService: NgxUiLoaderService,
    private readonly ngxNotificationMsgService: NgxNotificationMsgService,
    private router: Router,
    private route: ActivatedRoute, ) { }

  form = new FormGroup({
    nome_disciplina: new FormControl('', Validators.required),
    codigo: new FormControl('', [Validators.required, Validators.minLength(6)]),
    periodo: new FormControl('', Validators.required),
    turno: new FormControl('', [Validators.required])
  })

  ngOnInit() {

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
    if (this.form.valid) {
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
    }
  }
}

