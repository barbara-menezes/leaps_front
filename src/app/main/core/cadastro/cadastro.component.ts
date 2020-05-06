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
        this.dataSource = res.cadastro;
      }
    })
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
      }
      this.dataSource = res.cadastros;
    })
  }

  editCadastro(cadastro) {
    this.router.navigate(['cadastro/cadastro-form/edit', cadastro.matricula]);
  }

}
