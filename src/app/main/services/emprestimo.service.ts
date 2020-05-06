import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRestService } from './base-rest.service';
import { HttpClient } from '@angular/common/http';
import { TesteModel } from '../models/test-model';

@Injectable({
  providedIn: 'root'
})
export class EmprestimoService extends BaseRestService<TesteModel>{

  constructor(public http: HttpClient) {
    super(http, "emprestimo");
  }

  createemprestimo(emprestimo): Observable<any> {
    return this.http.post<any>(this.actionUrl, { emprestimo: emprestimo })
  }

  listAll(): Observable<any> {
    return this.http.get<any>(this.actionUrl);
  }

  delete(id): Observable<any> {
    return this.http.delete<any>(this.actionUrl + '/' + id);
  }

  findOne(id): Observable<any> {
    return this.http.get<any>(this.actionUrl + '/pesquisa/' + id);
  }

  update(emprestimo, id): Observable<any> {
    console.log(this.actionUrl + '/' + emprestimo.id, { emprestimo: emprestimo })
    return this.http.put<any>(this.actionUrl + '/' + id, { emprestimo: emprestimo })
  }
}
