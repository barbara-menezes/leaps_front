import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { SubjectService } from '../../services/subject.service';
import { NgxNotificationStatusMsg, NgxNotificationMsgService } from 'ngx-notification-msg';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'nome_disciplina', 'periodo', 'turno'];
  dataSource = [];

  constructor(private service: SubjectService,
    private router: Router,
    private readonly ngxNotificationMsgService: NgxNotificationMsgService) { }

  ngOnInit() {
    this.service.listAll().subscribe(res => {
      if (res) {
        this.dataSource = res.disciplina;
      }
    })
  }

  registerSubject() {
    this.router.navigateByUrl('/subject/subject-form')
  }

  deleteSubject(subject) {
    this.service.delete(subject.id).subscribe(res => {
      if (res) {
        this.ngxNotificationMsgService.open({
          status: NgxNotificationStatusMsg.SUCCESS,
          header: 'Poxa, que pena ...',
          msg: `A disciplina ${subject.nome_disciplina} foi excluída!`
        });
      }
      this.dataSource = res.disciplinas;
    })
  }

  editSubject(subject) {
    this.router.navigate(['subject/subject-form/edit', subject.codigo, subject.id]);
  }

}
