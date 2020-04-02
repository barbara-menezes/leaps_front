import {
  HttpClient
} from "@angular/common/http";
import { BaseService } from './base.service';


export abstract class BaseRestService<T> extends BaseService {

  constructor(protected http: HttpClient, endpointName: string) {
    super(http, endpointName);
  }
}
