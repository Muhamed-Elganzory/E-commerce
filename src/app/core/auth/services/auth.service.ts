import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {testingEnvironment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  register(user: any): Observable <any> {
    return this.httpClient.post(testingEnvironment.baseUrl + 'auth/signup', user);
  }

  login(user: any): Observable <any> {
    return this.httpClient.post(testingEnvironment.baseUrl + 'auth/signin', user);
  }
}
