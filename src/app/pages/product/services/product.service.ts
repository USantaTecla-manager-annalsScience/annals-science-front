import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient) { }

  getProductsList(): Observable<any>{
    return this._http.get(environment.annalsScienceUrl + '/products');
  }

  addProduct(product: any): Observable<any> {
    this.paseDataInput(product, 'categoriesId');
    this.paseDataInput(product,'personsId');
    this.paseDataInput(product,'entitiesId');
    return this._http.post(environment.annalsScienceUrl + '/products', product);
  }

  paseDataInput(dataInput: any, field: string){
    const data = [...dataInput[field]];
    const parseData = data.map(item => item?.id);
    dataInput[field] = parseData;
  }  
}
