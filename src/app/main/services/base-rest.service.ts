import {
  HttpClient,
  HttpParams
} from "@angular/common/http";
import { Observable } from "rxjs";
import { BaseService } from './base.service';


export abstract class BaseRestService<T> extends BaseService {

  constructor(protected http: HttpClient, endpointName: string) {
    super(http, endpointName);
  }

  public getById(id: number): Observable<T> {
    return this.http.get<T>(this.actionUrl + id);
  }

  public add(item: T): Observable<T> {
    return this.http.post<T>(this.actionUrl, item);
  }

  public update(item: T): Observable<T> {
    return this.http.put<T>(this.actionUrl, item);
  }

  public delete(id: number): Observable<T> {
    return this.http.delete<T>(this.actionUrl + id);
  }
}
