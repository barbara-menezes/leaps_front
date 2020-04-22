import { Injectable } from '@angular/core';
import { BaseRestService } from './base-rest.service';
import { StudentModel } from '../models/student-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends BaseRestService<StudentModel> {

  constructor(public http: HttpClient) {
    super(http, "aluno");
  }

  createStudent(Student): Observable<any> {
    return this.http.post<any>(this.actionUrl, { aluno: Student })
  }

  listAll(): Observable<any> {
    return this.http.get<any>(this.actionUrl + 's');
  }

  delete(id): Observable<any> {
    return this.http.delete<any>(this.actionUrl + '/' + id);
  }

  findOne(id): Observable<any> {
    return this.http.get<any>(this.actionUrl + '/pesquisa/' + id);
  }

  update(student, id): Observable<any> {
    return this.http.put<any>(this.actionUrl + '/' + id, { disciplina: student })
  }

}
