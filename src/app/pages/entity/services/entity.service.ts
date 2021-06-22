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

  constructor(private _http: HttpClient) {}

  addEntity(entity: any): Observable<any> {
    console.log(entity);
    this.parseCategoriesId(entity);
    this.parsePersonsId(entity);
    return this._http.post(environment.annalsScienceUrl + '/entities', entity);
  }

  parseCategoriesId(dataInput: any){
    const categories = [...dataInput['categoriesId']];
    const parseCategories = categories.map(item => item.id);
    dataInput['categoriesId'] = parseCategories;
  }

  parsePersonsId(dataInput: any){
    const categories = [...dataInput['personsId']];
    const parsePerson = categories.map(item => item.id);
    dataInput['personsId'] = parsePerson;
  }
}
