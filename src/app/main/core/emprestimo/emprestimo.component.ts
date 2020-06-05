import { NgxNotificationStatusMsg, NgxNotificationMsgService } from 'ngx-notification-msg';
import { EmprestimoService } from '../../services/emprestimo.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-emprestimo',
  templateUrl: './emprestimo.component.html',
  styleUrls: ['./emprestimo.component.scss']
})
export class EmprestimoComponent implements OnInit {
  
  displayedColumns: string[] = ['codigo', 'status', 'data devolucao', 'Data emprestimo', 'Retorno Previsto'];
  dataSource = [];

  constructor(private service: EmprestimoService,
    private router: Router,
    private readonly ngxNotificationMsgService: NgxNotificationMsgService) { }

  ngOnInit(){
    this.service.listAll().subscribe(res => {
      if (res) {
        this.dataSource = res.emprestimo;
        for (let index = 0; index < res.emprestimo.length; index++) {
          this.dataSource[index].retorno_previsto= this.dataFormatada(this.dataSource[index].retorno_previsto);
          this.dataSource[index].data = this.dataFormatada(this.dataSource[index].data);
        }
      }
    })
  }

  dataFormatada(data){
    var res = data.split("-");
    return res[2]+"/"+res[1]+"/"+res[0];
  }

  registerEmprestimo() {
    this.router.navigateByUrl('/emprestimo/emprestimo-form')
  }

  devolverEmprestimo(emprestimo) {
    var devolvido={data_devolucao:new Date().toLocaleDateString()}
    this.service.update(devolvido, emprestimo.id).toPromise().then(res => {
      if (res) {
        this.ngxNotificationMsgService.open({
          status: NgxNotificationStatusMsg.SUCCESS,
          header: 'Uhuuu!',
          msg: `O(a) Teste(a) ${emprestimo.testes[0].nome} foi devolvido(a)!`
        });
        setTimeout(() => { this.ngOnInit(); }, 700);
      }
      this.dataSource = res.emprestimo;
    })
  }

  deletarEmprestimo(emprestimo) {
    this.service.delete(emprestimo.id).subscribe(res => {
      if (res) {
        this.ngxNotificationMsgService.open({
          status: NgxNotificationStatusMsg.SUCCESS,
          header: 'Poxa, que pena ...',
          msg: `O(a) Empréstimo(a) ${emprestimo.nome} foi excluído(a)!`
        });
        setTimeout(() => {  this.ngOnInit(); }, 700);
      }
      this.dataSource = res.emprestimo;
    })
  }

  // editEmprestimo(emprestimo) {
  //   this.router.navigate(['emprestimo/emprestimo-form/edit', emprestimo.id]);
  // }

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
