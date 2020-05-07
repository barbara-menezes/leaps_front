import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  [x: string]: any;
  navigation: string;

  public autenticadoSource = new Subject<boolean>();

  autenticado = this.autenticadoSource.asObservable();

  constructor(public http: HttpClient) {
    super(http, '');
  }
  user: any;


  public login(login: any): Observable<any> {
    return this.http.post<any>(this.actionUrl + "sessions/", login);
  }

  public registrar(data: any) {
    return this.http.post(this.actionUrl, data);
  }

  public logout() {
    localStorage.clear();
    this.autenticadoSource.next(false);
  }

  public setToken(token) {
    localStorage.setItem('token', token);
  }

  public isLoged() {
    if (this.getToken() !== null) {
      return true;
    } else {
      return false;
    }
  }

  public getToken() {
    try {
      return JSON.parse(localStorage.getItem('token'));
    } catch (e) {
      return null;
    }
  }

  public setUser(user) {
    localStorage.setItem('usuario', user);
    this.autenticadoSource.next(true);
  }

  public getUserName() {
    return this.user = {
      usuario: localStorage.getItem('usuario')
    }
  }

  public getTipoUsuario() {
    return localStorage.getItem('tipoUsuario');
  }

}
