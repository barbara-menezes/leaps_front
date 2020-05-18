import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/main/services/student.service';
import { NgxNotificationMsgService, NgxNotificationStatusMsg } from 'ngx-notification-msg';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { SubjectService } from 'src/app/main/services/subject.service';

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

  disciplinas: FormArray = new FormArray([]);

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
          this.form.get('nome_aluno').setValue(aluno[0].nome_aluno);
          this.form.get('codigo').setValue(aluno[0].codigo);
          this.form.get('periodo').setValue(aluno[0].periodo);
          this.form.get('turno').setValue(aluno[0].turno)
        }
      })
    }
  }

  saveOrUpdate(): void {
    if (this.disciplinas.valid) {
      this.form.addControl('disciplinas', this.disciplinas);
    }

    if (this.form.valid) {
      if (this.id === null) {
        this.service.createStudent(this.form.value).toPromise().then(res => {
          if (res) {
            this.ngxNotificationMsgService.open({
              status: NgxNotificationStatusMsg.SUCCESS,
              header: 'Parabéns!',
              msg: `O(a) aluno(a) ${res.aluno.nome_aluno} foi cadastrado(a) com sucesso!`,
              delay: 3500
            });
            this.router.navigateByUrl('/student')
          }
        })
      } else {
        this.service.update(this.form.value, this.id).toPromise().then(res => {
          if (res) {
            this.ngxNotificationMsgService.open({
              status: NgxNotificationStatusMsg.INFO,
              header: 'Ebaa!',
              msg: `O(a) aluno(a) ${this.form.get('nome_aluno').value} foi atualizado(a) com sucesso!`,
              delay: 3500
            });
            this.router.navigateByUrl('/student')
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

  createItem(disciplina) {
    if (disciplina) {
      return new FormGroup({
        codigo: new FormControl(disciplina.codigo, Validators.required),
        id: new FormControl(disciplina.id, Validators.required),
        nome_disciplina: new FormControl(disciplina.nome_disciplina, Validators.required),
        turno: new FormControl(disciplina.turno, Validators.required),
        periodo: new FormControl(disciplina.periodo, Validators.required)
      })
    }
  }

  adicionarDisciplina(disciplina) {
    if (disciplina) {
      this.disciplinas.push(this.createItem(disciplina));
    }
  }
}
