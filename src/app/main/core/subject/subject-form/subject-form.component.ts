import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.css']
})
export class SubjectFormComponent implements OnInit {

  cadastro : FormGroup;

  constructor(private fb : FormBuilder) { }

  ngOnInit() {
    this.cadastro = this.fb.group({
      cod_disciplina: ['', [Validators.required, Validators.minLength(6)]],
      nome_disciplina: ['', [Validators.required]],
      periodo: [0, [Validators.required, Validators.min(4), Validators.max(10)]],
      turno: ['', [Validators.required]]
    });
  }

  save(): void {
    if (this.cadastro.invalid) {
      return;
    }
    alert('success' + JSON.stringify(this.cadastro.value, null, 4))
  }

  resetForm(): void {
    this.cadastro.reset();
  }

}
