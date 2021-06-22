import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryInputMap, CategoryOutpuMap } from 'src/app/models/interfaces/category.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http: HttpClient) { }

  addCategory(category: CategoryInputMap): Observable<any> {
    return this._http.post(environment.annalsScienceUrl + '/categories', category);
  }

  getCategories(): Observable<any> {
    return this._http.get(environment.annalsScienceUrl + '/categories');
  }
}
