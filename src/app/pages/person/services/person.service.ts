import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from 'src/app/models/interfaces/person.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  person: Person;

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

  deletePersonById(id: any): Observable<any> {
    return this._http.delete(environment.annalsScienceUrl + '/persons/'+id);
  }

  getPersonById(id: any):  Observable<any> {
    return this._http.get(environment.annalsScienceUrl + '/persons/'+id);

  }

  updatePerson(person: any, id: any): Observable<any> {
    const categories = [...person['categoriesId']];
    const parseCategories = categories.map(item => item?.id);
    person['categoriesId'] = parseCategories;

    return this._http.put(environment.annalsScienceUrl + '/persons/'+id, person);
  }

  getCurrentEditPerson(): Person{
    return {... this.person};
  }

  setCurrentEditPerson(person: Person) {
    this.person = person;
  }

  clearCurrentEditPerson(){
    this.person = undefined;
  }

}
