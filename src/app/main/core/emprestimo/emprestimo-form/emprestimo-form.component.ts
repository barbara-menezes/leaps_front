import { Component, OnInit } from '@angular/core';
import { EmprestimoService } from 'src/app/main/services/emprestimo.service';
import { NgxNotificationMsgService, NgxNotificationStatusMsg } from 'ngx-notification-msg';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentService } from 'src/app/main/services/student.service';

@Component({
  selector: 'app-emprestimo-form',
  templateUrl: './emprestimo-form.component.html',
  styleUrls: ['./emprestimo-form.component.scss']
})
export class EmprestimoFormComponent implements OnInit {

  id: any;
  codigo: any;
  listAlunos: any = [];

  constructor(private service: EmprestimoService,
    private readonly ngxNotificationMsgService: NgxNotificationMsgService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private studentService: StudentService) { }

  form = new FormGroup({
    codigo: new FormControl('', [Validators.required]),
    status: new FormControl('', Validators.required),
    data_devolucao: new FormControl('', [Validators.required]),
    data: new FormControl('', Validators.required),
    retorno_previsto: new FormControl('', [Validators.required])
  })


  alunos: any[];
  teste: any [];



  ngOnInit() {
    this.studentService.listAll().subscribe(res => {
      if (res) {
        this.listAlunos = res.aluno;
      }
    })

    this.codigo = this.route.snapshot.paramMap.get("codigo");
    this.id = this.route.snapshot.paramMap.get("id");
    if (!!this.codigo) {
      this.service.findOne(this.id).subscribe(res => {
        if (res.length === 1) {
          let emprestimo = res[0];
          this.form.get('codigo').setValue(emprestimo[0].codigo);
          this.form.get('status').setValue(emprestimo[0].status);
          this.form.get('data_devolucao').setValue(emprestimo[0].data_devolucao);
          this.form.get('data').setValue(emprestimo[0].data)
          this.form.get('retorno').setValue(emprestimo[0].retorno)
        }
      })
    }
  }

  saveOrUpdate(): void {
    if (this.form.valid) {
      if (this.id === null) {
        this.service.createemprestimo(this.form.value).toPromise().then(res => {
          if (res) {
            this.ngxNotificationMsgService.open({
              status: NgxNotificationStatusMsg.SUCCESS,
              header: 'Parabéns!',
              msg: `O(a) emprestimo(a) ${res.emprestimo.codigo} foi cadastrado(a) com sucesso!`,
              delay: 3500
            });
            this.router.navigateByUrl('/emprestimo')
          }
        })
      } else {
        this.service.update(this.form.value, this.id).toPromise().then(res => {
          if (res) {
            this.ngxNotificationMsgService.open({
              status: NgxNotificationStatusMsg.INFO,
              header: 'Ebaa!',
              msg: `O(a) Empréstimo(a) ${this.form.get('codigo').value} foi atualizado(a) com sucesso!`,
              delay: 3500
            });
            this.router.navigateByUrl('/emprestimo')
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
    this.router.navigateByUrl('/emprestimo')
  }

  adicionarAluno(aluno) {
    if (aluno) {
      try{

        this.studentService.findByNome(aluno).subscribe(res => {
          if(res)
          console.log(res);
          this.teste= res[0];
          this.teste= this.teste[0].disciplinas; 
          for(let i =0; this.teste.length>i;i++){
            for(let n=0; this.teste[i].testes>n;n++){
              this.teste[i]=this.teste[i].testes[n].nome
              console.log(this.teste[i])
              console.log(this.teste[i].testes[n].nome)
            }
          }
        });
      }
      catch(error){
        console.log(error);
      }
    }
  }
}
