import { NgxNotificationStatusMsg, NgxNotificationMsgService } from 'ngx-notification-msg';
import { StudentService } from '../../services/student.service';
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

  constructor(private service: StudentService,
    private router: Router,
    private readonly ngxNotificationMsgService: NgxNotificationMsgService) { }

  ngOnInit() {
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
        setTimeout(() => {  window.location.reload(); }, 700);
      }
      this.dataSource = res.alunos;
    })
  }

  editStudent(student) {
    this.router.navigate(['student/student-form/edit', student.matricula, student.id]);
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
      td = tr[i].getElementsByTagName("td")[0];
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
