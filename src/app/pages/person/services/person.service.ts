import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonInputMap } from 'src/app/models/interfaces/person.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private _http: HttpClient) { }

  getPersonList(): Observable<any> {
    return this._http.get(environment.annalsScienceUrl + '/persons');
  }

  addPerson(person: PersonInputMap): Observable<any> {
    return this._http.post(environment.annalsScienceUrl + '/persons', person);
  }

}
