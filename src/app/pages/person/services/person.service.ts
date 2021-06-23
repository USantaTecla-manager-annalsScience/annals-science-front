import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private _http: HttpClient) { }

  getPersonList(): Observable<any> {
    return this._http.get(environment.annalsScienceUrl + '/persons');
  }

  addPerson(person: any): Observable<any> {
    const categories = [...person['categoriesId']];
    const parseCategories = categories.map(item => item?.id);
    person['categoriesId'] = parseCategories;

    return this._http.post(environment.annalsScienceUrl + '/persons', person);
  }

}
