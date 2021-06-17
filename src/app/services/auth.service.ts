import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserInput, UserLoginInput } from '../models/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }
 
  register(user: User): Observable<any> {
    return this._http.post(environment.annalsScienceUrl + '/users', user);
  }

  login(user: User): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', 'Basic ' + window.btoa(user.email + ':' + user.password));

    return this._http.post(environment.annalsScienceUrl + '/users/login', {}, {
      headers,
      responseType: 'text'
    });
  }
}
