import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/main/services/student.service';
import { NgxNotificationMsgService, NgxNotificationStatusMsg } from 'ngx-notification-msg';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { SubjectService } from 'src/app/main/services/subject.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  id: any;
  codigo: any;
  listDisciplinas: any = [];

  constructor(private service: StudentService,
    private readonly ngxNotificationMsgService: NgxNotificationMsgService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private disciplinaService: SubjectService) { }

  form = new FormGroup({
    matricula: new FormControl('', [Validators.required, Validators.minLength(6)]),
    nome: new FormControl('', Validators.required),
    telefone: new FormControl('', [Validators.required]),
    email: new FormControl('', Validators.required),
  })

  disciplinas: any = [];

  ngOnInit() {
    this.disciplinaService.listAll().subscribe(res => {
      if (res) {
        this.listDisciplinas = res.disciplina;
      }
    })

    this.codigo = this.route.snapshot.paramMap.get("codigo");
    this.id = this.route.snapshot.paramMap.get("id");
    if (!!this.codigo) {
      this.service.findOne(this.codigo).subscribe(res => {
        if (res.length === 1) {
          let aluno = res[0];
          this.form.get('nome').setValue(aluno[0].nome);
          this.form.get('matricula').setValue(aluno[0].matricula);
          this.form.get('telefone').setValue(aluno[0].telefone);
          this.form.get('email').setValue(aluno[0].email)
          for (let i = 0; i < this.listDisciplinas.length; i++) {
            const element = this.listDisciplinas[i].nome_disciplina;
            if(res.aluno[0].disciplinas.nome_disciplina)
              console.log(aluno[0].disciplinas.nome_disciplina)
          }
        }
      })
    }
  }

  saveOrUpdate(): void {


    if (this.form.valid && this.disciplinas.length > 0) {
      if (this.id === null) {
        this.service.createStudent(this.form.value, this.disciplinas).toPromise().then(res => {
          if (res) {
            this.router.navigateByUrl('/student')
            this.ngxNotificationMsgService.open({
              status: NgxNotificationStatusMsg.SUCCESS,
              header: 'Parabéns!',
              msg: `O(a) aluno(a) ${res.aluno.nome} foi cadastrado(a) com sucesso!`,
              delay: 3500
            });
            
          }
        })
      } else {
        this.service.update(this.form.value, this.form.get('matricula').value,this.disciplinas).toPromise().then(res => {
          if (res) {
            this.router.navigateByUrl('/student')
            this.ngxNotificationMsgService.open({
              status: NgxNotificationStatusMsg.INFO,
              header: 'Ebaa!',
              msg: `O(a) aluno(a) ${this.form.get('nome').value} foi atualizado(a) com sucesso!`,
              delay: 3500
            });
            
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
    this.router.navigateByUrl('/student')
  }

  adicionarDisciplina(disciplina) {
    if (disciplina) {
      this.disciplinas.push(disciplina.id);
    }
  }
}
