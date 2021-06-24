import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/interfaces/category.interface';
import { Entity, EntityInputMap } from 'src/app/models/interfaces/entity.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  currentEditEntity: Entity

  constructor(private _http: HttpClient) { }

  getEntityList(): Observable<any> {
    return this._http.get(environment.annalsScienceUrl + '/entities');
  }
  addEntity(entity: any): Observable<any> {
    this.parseCategoriesId(entity);
    this.parsePersonsId(entity);
    return this._http.post(environment.annalsScienceUrl + '/entities', entity);
  }

  getEntityById(id: number): Observable<any>{
    return this._http.get(environment.annalsScienceUrl + '/entities/' + id);

  }

  
  deleteEntityById(id: number): Observable<any> {
    return this._http.delete(environment.annalsScienceUrl + '/entities/' + id);
  }


  updateEntity(entity: Entity, id: number): Observable<any> {

    this.parseCategoriesId(entity);
    this.parsePersonsId(entity);
    return this._http.put(environment.annalsScienceUrl + '/entities/' + id, entity);
  }

  parseCategoriesId(dataInput: any) {
    const categories = [...dataInput['categoriesId']];
    const parseCategories = categories.map(item => item?.id);
    dataInput['categoriesId'] = parseCategories;
  }

  parsePersonsId(dataInput: any) {
    const persons = [...dataInput['personsId']];
    const parsePerson = persons.map(item => item?.id);
    dataInput['personsId'] = parsePerson;
  }

  getEntity(): Entity {
    return { ... this.currentEditEntity };
  }

  setEntity(entity: Entity) {
    this.currentEditEntity = entity;
  }

  clearEntity() {
    this.currentEditEntity = undefined;
  }
}
