import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teste-form',
  templateUrl: './teste-form.component.html',
  styleUrls: ['./teste-form.component.scss']
})
export class TesteFormComponent implements OnInit {

  constructor(private router: Router) { }

  form = new FormGroup({});

  ngOnInit(): void {
  }

  voltar() {
    this.router.navigateByUrl('/test');
  }
}
