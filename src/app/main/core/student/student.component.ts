import { NgxNotificationStatusMsg, NgxNotificationMsgService } from 'ngx-notification-msg';
import { SubjectService } from '../../services/subject.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  
  displayedColumns: string[] = ['codigo', 'nome', 'telefone', 'email', 'disciplinas'];
  dataSource = [];

  constructor(private service: SubjectService,
    private router: Router,
    private readonly ngxNotificationMsgService: NgxNotificationMsgService) { }

  ngOnInit(){
    this.service.listAll().subscribe(res => {
      if (res) {
        this.dataSource = res.aluno;
      }
    })
  }

  
  registerStudent() {
    this.router.navigateByUrl('/student/student-form')
  }

  deleteStudent(student) {
    this.service.delete(student.id).subscribe(res => {
      if (res) {
        this.ngxNotificationMsgService.open({
          status: NgxNotificationStatusMsg.SUCCESS,
          header: 'Poxa, que pena ...',
          msg: `O(a) Aluno(a) ${student.nome} foi excluído(a)!`
        });
      }
      this.dataSource = res.alunos;
    })
  }

  editStudent(student) {
    this.router.navigate(['student/student-form/edit', student.matricula]);
  }

}
