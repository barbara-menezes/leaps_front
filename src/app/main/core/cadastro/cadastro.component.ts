import { NgxNotificationStatusMsg, NgxNotificationMsgService } from 'ngx-notification-msg';
import { CadastroService } from '../../services/cadastro.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  
  displayedColumns: string[] = ['nome', 'email', 'matricula', 'usuario'];
  dataSource = [];

  constructor(private service: CadastroService,
    private router: Router,
    private readonly ngxNotificationMsgService: NgxNotificationMsgService) { }

  ngOnInit(){
    this.service.listAll().subscribe(res => {
      if (res) {
        this.dataSource = res.usuario;
      }
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
  
  registerCadastro() {
    this.router.navigateByUrl('/cadastro/cadastro-form')
  }

  deleteCadastro(cadastro) {
    this.service.delete(cadastro.id).subscribe(res => {
      if (res) {
        this.ngxNotificationMsgService.open({
          status: NgxNotificationStatusMsg.SUCCESS,
          header: 'Poxa, que pena ...',
          msg: `O(a) Usuario(a) ${cadastro.nome} foi excluído(a)!`
        });
        setTimeout(() => {  window.location.reload(); }, 700);
      }
      this.dataSource = res.cadastros;
    })
  }

  editCadastro(cadastro) {
    this.router.navigate(['cadastro/cadastro-form/edit',cadastro.id, cadastro.id_tipo_usuario]);
  }

}
