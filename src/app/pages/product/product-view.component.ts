import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { Category } from 'src/app/models/interfaces/category.interface';
import { Product } from 'src/app/models/interfaces/product.interface';
import { TokenService } from 'src/app/services/token.service';
import { CategoryService } from '../category/services/category.service';
import { ProductDetailModalComponent } from './modals/product-detail-modal/product-detail-modal.component';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  messageError = 'An error occurs';
  form : FormGroup = new FormGroup({});
  productList: Product[] = [];
  categoryList: Category[] = [];
  selectedProductId: any;

  constructor(private _productService: ProductService, private _snackBar: MatSnackBar, private _tokenService: TokenService,
    private modal: MatDialog, private router: Router, private fb: FormBuilder,   private _categoryService: CategoryService) { }




  ngOnInit(): void {
    this._productService.clearProduct();
    this.getProductList();
    this.getCategoryList();
    this.formBuilder();
  }

  formBuilder(){
    this.form = this.fb.group({
      category: [null]
    })
  }

  getProductList() {
    this._productService.getProductsList().subscribe(res => {
      this.productList = res;
    }, err => {
      console.log(err)
      if (err.status === 401) {
        this.messageError = "You don't have permission for this operation";
      }
      this._snackBar.openFromComponent(SnackbarComponent, { data: this.messageError, duration: 3000 });
    });
  }

  getCategoryList() {
    this._categoryService.getCategories().subscribe(data => {
      this.categoryList = data;
    }, err => {
      this._snackBar.openFromComponent(SnackbarComponent, { data: 'An error occurs', duration: 3000 });
    })
  }


  getSelectedItem(item) {
    this.selectedProductId = item;
  }

  checkLoggin(): boolean {
    return this._tokenService.exist();
  }

  async openModal() {
    const currentProduct = await this.getSelectedProduct();
    const dialogRef = this.modal.open(ProductDetailModalComponent, {
      width: '600px',
      data: currentProduct
      
    });

    dialogRef.afterClosed().subscribe((productId) => {
      if(productId){
        this.router.navigate(['/product-edit', productId ]);
        this._productService.setProduct(currentProduct);
      }

      this.selectedProductId = null;
    });
  }

  getSelectedProduct() { 
    return this._productService.getProductById(this.selectedProductId).toPromise();
  }

  onDeleteEntity(producId){
    this._productService.deleteProductById(producId).subscribe(res =>{
      this._snackBar.openFromComponent(SnackbarComponent, { data: 'Product deleted', duration: 3000 });
      this.getProductList();

    },err => {
      console.log(err);
      this._snackBar.openFromComponent(SnackbarComponent, { data: 'An error occurs', duration: 3000 });
    });
  }

  onSearch(){
    const cat = this.form.get('category').value ?? null ;
    if(cat){
      this.getProductsBycat(cat);
    }
  }

  clean(){
    this.form.reset();
    this.form.updateValueAndValidity();
    this.getProductList();
    this.selectedProductId = null;
  }

  getProductsBycat(catName: string){
    this._productService.getProductsByCategory(catName).subscribe( res => {
      this.productList = res;
    })
  }

  


}
