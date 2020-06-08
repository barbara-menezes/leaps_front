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
        this.dataSource = res.disciplinas;
        this.ngxNotificationMsgService.open({
          status: NgxNotificationStatusMsg.SUCCESS,
          header: 'Poxa, que pena ...',
          msg: `A disciplina ${subject.nome_disciplina} foi excluída!`
        });
        setTimeout(() => {  window.location.reload(); }, 700);
      }

    })
  }

  editSubject(subject) {
    this.router.navigate(['subject/subject-form/edit', subject.codigo, subject.id]);
  }


  myFunction() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 1; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
}
