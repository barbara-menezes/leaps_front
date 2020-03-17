import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor(public http: HttpClient) {
    super(http, "auth");
  }

  public getToken() {
    try {
      return JSON.parse(localStorage.getItem('token'));
    } catch (e) {
      return null;
    }
  }

}
