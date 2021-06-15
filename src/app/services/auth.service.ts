import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserInput } from '../models/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }
 
  register(user: UserInput): Observable<any> {
    return this._http.post(environment.annalsScienceUrl + '/users', user);
  }
}
