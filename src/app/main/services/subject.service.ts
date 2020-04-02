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

  createSubject(subject): Observable<SubjectModel> {
    return this.http.post<SubjectModel>(this.actionUrl, { disciplina: subject })
  }

  listAll(): Observable<SubjectModel> {
    return this.http.get<SubjectModel>(this.actionUrl + 's')
  }
}
