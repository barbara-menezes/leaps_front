import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRestService } from './base-rest.service';
import { HttpClient } from '@angular/common/http';
import { CadastroModel } from '../models/cadastro-model';

@Injectable({
  providedIn: 'root'
})
export class CadastroService extends BaseRestService<CadastroModel>{

  constructor(public http: HttpClient) {
    super(http, "monitor");
  }

  createCadastro(monitor): Observable<any> {
    return this.http.post<any>(this.actionUrl, { monitor: monitor})
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

  update(cadastro, id): Observable<any> {
    console.log(this.actionUrl + '/' + cadastro.id, { cadastro: cadastro })
    return this.http.put<any>(this.actionUrl + '/' + id, { cadastro: cadastro })
  }
}
