import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { categoryInputMap } from 'src/app/models/interfaces/category.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http: HttpClient) { }

  addCategory(category: categoryInputMap): Observable<any> {
    return this._http.post(environment.annalsScienceUrl + '/categories', category);
  }
}
