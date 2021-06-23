import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person, PersonInputMap } from 'src/app/models/interfaces/person.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  currentEditPerson: Person;

  constructor(private _http: HttpClient) { }

  getPersonList(): Observable<any> {
    return this._http.get(environment.annalsScienceUrl + '/persons');
  }

  addPerson(person: Person): Observable<any> {
    this.parseData(person);
    return this._http.post(environment.annalsScienceUrl + '/persons', person);
  }

  deletePersonById(id: number): Observable<any> {
    return this._http.delete(environment.annalsScienceUrl + '/persons/' + id);
  }

  getPersonById(id: number): Observable<any> {
    return this._http.get(environment.annalsScienceUrl + '/persons/' + id);

  }

  updatePerson(person: Person, id: number): Observable<any> {

    this.parseData(person);
    person['deathDate']="hoy";
    return this._http.put(environment.annalsScienceUrl + '/persons/' + id, person);
  }

  getPerson(): Person {
    return { ... this.currentEditPerson };
  }

  setPerson(person: Person) {
    this.currentEditPerson = person;
  }

  clearPerson() {
    this.currentEditPerson = undefined;
  }

  parseData(person: Person) {
    const categories = [...person['categoriesId']];
    const parseCategories = categories.map(item => item?.id);
    person['categoriesId'] = parseCategories;
  }

}
