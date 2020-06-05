import { Component, OnInit } from '@angular/core';
import { CadastroService } from 'src/app/main/services/cadastro.service';
import { NgxNotificationMsgService, NgxNotificationStatusMsg } from 'ngx-notification-msg';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-form',
  templateUrl: './cadastro-form.component.html',
  styleUrls: ['./cadastro-form.component.scss']
})
export class CadastroFormComponent implements OnInit {

  id: any;
  id_tipo_usuario: any;

  constructor(private service: CadastroService,
    private readonly ngxNotificationMsgService: NgxNotificationMsgService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar) { }

    form = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', Validators.required),
      matricula: new FormControl('', [Validators.required]),
      usuario: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required),
      id_tipo_usuario: new FormControl('1')
    })

  ngOnInit() {

    document.getElementById('olho').addEventListener('mousedown', function() {
      document.getElementById('pass')["type"] = 'text';
    });
    
    document.getElementById('olho').addEventListener('mouseup', function() {
      document.getElementById('pass')["type"]  = 'password';
    });
    
    document.getElementById('olho').addEventListener('mousemove', function() {
      document.getElementById('pass')["type"] = 'password';
    });

    this.id_tipo_usuario = this.route.snapshot.paramMap.get("id_tipo_usuario");
    this.id = this.route.snapshot.paramMap.get("id");
    if (!!this.id_tipo_usuario) {
      try{
        this.service.findOne(this.id_tipo_usuario).subscribe(res => {
          if(res){
            let usuario = res.usuario;
            this.form.get('nome').setValue(usuario.nome);
            this.form.get('email').setValue(usuario.email);
            this.form.get('matricula').setValue(usuario.matricula);
            this.form.get('usuario').setValue(usuario.usuario)
          } 
        })
      }
      catch(error){
        console.log(error);
      }

    }
    
  }

  saveOrUpdate(): void {
    if (this.form.valid) {
      if (this.id === null) {
        this.service.createCadastro(this.form.value).toPromise().then(res => {
          if (res.error==="Usuario ja existe.") {
            this.ngxNotificationMsgService.open({
              status: NgxNotificationStatusMsg.INFO,
              header: 'Monitor já cadastrado!',
              msg: `MATRÍCULA ou o USERNAME já está sendo utilizado por outro usuário!`,
              delay: 5500
            });
          }else if(res){
            this.ngxNotificationMsgService.open({
              status: NgxNotificationStatusMsg.SUCCESS,
              header: 'Parabéns!',
              msg: `O(a) monitor(a)  foi cadastrado(a) com sucesso!`,
              delay: 3500
            });
            this.router.navigateByUrl('/cadastro')
          }
        })
      } else {
        this.service.update(this.form.value, this.id).toPromise().then(res => {
          if (res) {
            this.ngxNotificationMsgService.open({
              status: NgxNotificationStatusMsg.INFO,
              header: 'Ebaa!',
              msg: `O(a) usuario(a) ${this.form.get('nome').value} foi atualizado(a) com sucesso!`,
              delay: 3500
            });
            this.router.navigateByUrl('/cadastro')
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
    this.router.navigateByUrl('/cadastro')
  }

  adicionaTeste(teste){
    if(teste){
      this.form.addControl('usuario_monitor', new FormControl ("tipo: AED", Validators.required));
    }
  }

}
