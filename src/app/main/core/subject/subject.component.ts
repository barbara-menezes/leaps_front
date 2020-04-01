import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

axios({
  method:'get',
  url:'http://localhost:8080/disciplinas'
}).then(disciplinas =>console.log(disciplinas))

export interface Disciplinas {
  codigo: number;
  disciplina: string;
  periodo: number;
  turno: string;
}

const Disciplinas: Disciplinas[] = [
  {codigo: 1, disciplina: "1.0079", periodo: 5,turno:"Noite"},
  {codigo: 2, disciplina: "4.0026", periodo: 5,turno:"Noite"},
  { codigo: 3, disciplina: "6.941", periodo: 5,turno:"Noite"},
  { codigo: 4, disciplina: "9.0122", periodo: 5,turno:"Noite"},
  { codigo: 5, disciplina: "10.811", periodo: 5,turno:"Noite"},
  { codigo: 6, disciplina: "12.0107", periodo: 5,turno:"Noite"},
  { codigo: 7, disciplina: "14.0067", periodo: 5,turno:"Noite"},
  { codigo: 8, disciplina: "15.9994", periodo: 5,turno:"Noite"},
  { codigo: 9, disciplina: "18.9984", periodo: 5,turno:"Noite"},
  { codigo: 10, disciplina: "20.1797", periodo: 5,turno:"Noite"},
];
@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = Disciplinas;
  constructor(
    private router: Router
) { }
  ngOnInit(): void {
  
  }
  goToDisciplina() {
    this.router.navigate(['/subject/subject-form']);
  }
  
}
