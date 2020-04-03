import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRestService } from './base-rest.service';
import { HttpClient } from '@angular/common/http';
import { TesteModel } from '../models/test-model';

@Injectable({
  providedIn: 'root'
})
export class TestService extends BaseRestService<TesteModel>{

  constructor(public http: HttpClient) {
    super(http, "teste");
  }

  createteste(teste): Observable<any> {
    return this.http.post<any>(this.actionUrl, { disciplina: teste })
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

  update(teste, id): Observable<any> {
    console.log(this.actionUrl + '/' + teste.id, { disciplina: teste })
    return this.http.put<any>(this.actionUrl + '/' + id, { disciplina: teste })
  }
}
