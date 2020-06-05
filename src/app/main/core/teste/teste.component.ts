import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestService } from '../../services/test.service';
import { NgxNotificationStatusMsg, NgxNotificationMsgService } from 'ngx-notification-msg';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.scss']
})
export class TesteComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'status', 'nome'];
  dataSource = [];

  constructor(private service: TestService,
    private router: Router,
    private readonly ngxNotificationMsgService: NgxNotificationMsgService) { }

  ngOnInit() {
    this.service.listAll().subscribe(res => {
      if (res) {
        this.dataSource = res.teste;
      }
    })
  }

  cadastrarTeste() {
    this.router.navigateByUrl('/test/test-form');
  }

  deleteTest(teste) {
    this.service.delete(teste.id).subscribe(res => {
      if (res) {
        this.ngxNotificationMsgService.open({
          status: NgxNotificationStatusMsg.SUCCESS,
          header: 'Poxa, que pena ...',
          msg: `O teste ${teste.nome} foi excluido!`
        });
        setTimeout(() => {  window.location.reload(); }, 700);
      }
      this.dataSource = res.teste;
    })
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
  
  editTest(teste) {
    this.router.navigate(['/test/test-form/edit', teste.codigo, teste.id]);
  }

}
