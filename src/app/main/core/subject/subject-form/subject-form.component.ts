import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { SubjectService } from 'src/app/main/services/subject.service';
import { NgxNotificationMsgService, NgxNotificationStatusMsg } from 'ngx-notification-msg';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.css']
})
export class SubjectFormComponent implements OnInit {

  constructor(private service: SubjectService,
    private ngxService: NgxUiLoaderService,
    private readonly ngxNotificationMsgService: NgxNotificationMsgService,
    private router: Router) { }

  form = new FormGroup({
    nome_disciplina: new FormControl('', Validators.required),
    codigo: new FormControl('', [Validators.required, Validators.minLength(6)]),
    periodo: new FormControl('', Validators.required),
    turno: new FormControl('', [Validators.required])
  })

  ngOnInit() {
  }

  cadastrar(): void {
    if (this.form.valid) {

      // this.ngxService.start();
      this.service.createSubject(this.form.value).subscribe(res => {
        if (res) {
          // this.ngxService.stop();

          this.ngxNotificationMsgService.open({
            status: NgxNotificationStatusMsg.SUCCESS,
            header: 'Parabéns!',
            msg: 'O cadastro da disciplina foi realizado com sucesso!'
          });
          this.router.navigateByUrl('/subject')
        }
      })
    }
  }
}
