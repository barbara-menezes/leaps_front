import { NgxNotificationStatusMsg, NgxNotificationMsgService } from 'ngx-notification-msg';
import { EmprestimoService } from '../../services/emprestimo.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

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
      }
    })
  }

  
  registerEmprestimo() {
    this.router.navigateByUrl('/emprestimo/emprestimo-form')
  }

  devolverEmprestimo(emprestimo) {
    this.service.delete(emprestimo.id).subscribe(res => {
      if (res) {
        this.ngxNotificationMsgService.open({
          status: NgxNotificationStatusMsg.SUCCESS,
          header: 'Poxa, que pena ...',
          msg: `O(a) Empréstimo(a) ${emprestimo.nome} foi excluído(a)!`
        });
      }
      this.dataSource = res.emprestimo;
    })
  }

  editEmprestimo(emprestimo) {
    this.router.navigate(['emprestimo/emprestimo-form/edit', emprestimo.id]);
  }

}
