import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRestService } from './base-rest.service';
import { HttpClient } from '@angular/common/http';
import { EmprestimoModel } from '../models/emprestimo-model';

@Injectable({
  providedIn: 'root'
})
export class EmprestimoService extends BaseRestService<EmprestimoModel>{

  constructor(public http: HttpClient) {
    super(http, "emprestimo");
  }

  createemprestimo(emprestimo): Observable<any> {
    return this.http.post<any>(this.actionUrl + 's', emprestimo )
  }

  listAll(): Observable<any> {
    return this.http.get<any>(this.actionUrl);
  }

  delete(id): Observable<any> {
    return this.http.delete<any>(this.actionUrl + '/' + id);
  }

  findOne(id): Observable<any> {
    return this.http.get<any>(this.actionUrl + '' + id);
  }

  update(emprestimo, id): Observable<any> {
    return this.http.put<any>(this.actionUrl + '/devolucao/' + id, { emprestimo })
  }
}
