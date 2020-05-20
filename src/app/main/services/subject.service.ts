import { Injectable } from '@angular/core';
import { BaseRestService } from './base-rest.service';
import { SubjectModel } from '../models/subject-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService extends BaseRestService<SubjectModel> {

  constructor(public http: HttpClient) {
    super(http, "disciplina");
  }

  createSubject(subject, testes): Observable<any> {
    subject.testes = testes;
    return this.http.post<any>(this.actionUrl, { disciplina: subject })
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

  update(subject, id): Observable<any> {
    return this.http.put<any>(this.actionUrl + '/' + id, { disciplina: subject })
  }

}
