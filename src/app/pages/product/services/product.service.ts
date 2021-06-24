import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/interfaces/product.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  currentEditProduct: Product;

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
  getProductById(id: number): Observable<any>{
    return this._http.get(environment.annalsScienceUrl + '/products/' + id);

  }

  deleteProductById(id: number): Observable<any> {
    return this._http.delete(environment.annalsScienceUrl + '/products/' + id);
  }

  updateProduct(product: Product, id: number): Observable<any> {
    this.paseDataInput(product, 'categoriesId');
    this.paseDataInput(product,'personsId');
    this.paseDataInput(product,'entitiesId');
    return this._http.put(environment.annalsScienceUrl + '/products/' + id, product);
  }

  getProductsByCategory(category: string): Observable<any>{
    return this._http.get(environment.annalsScienceUrl + '/products?category=' +category);

  }

  paseDataInput(dataInput: any, field: string){
    const data = [...dataInput[field]];
    const parseData = data.map(item => item?.id);
    dataInput[field] = parseData;
  }  

  getProduct(): Product {
    return { ... this.currentEditProduct };
  }

  setProduct(product: Product) {
    this.currentEditProduct = product;
  }

  clearProduct() {
    this.currentEditProduct = undefined;
  }
}
