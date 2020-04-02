import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  disciplinas: any = [];

  constructor(private service: SubjectService,
    private router: Router) { }

  ngOnInit(): void {
    this.service.listAll().subscribe(res => {
      if (res) {
        this.disciplinas = res.disciplina;
      }
    })
  }

}
