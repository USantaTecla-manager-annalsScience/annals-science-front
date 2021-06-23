import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { ProductOutputMap } from 'src/app/models/interfaces/product.interface';
import { TokenService } from 'src/app/services/token.service';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  
  constructor(private _productService: ProductService, private _snackBar: MatSnackBar, private _tokenService: TokenService,
    ) { }

  productList: ProductOutputMap [] = [];
  selectedProductId: any;


  ngOnInit(): void {
    this.getProductList();
  }

  getProductList(){
    this._productService.getProductsList().subscribe( res => {
      this.productList = res;
    },err =>{
      console.log(err);
      this._snackBar.openFromComponent(SnackbarComponent, { data: 'An error occurs', duration: 3000 });
    });
  }
  
  getSelectedItem(item){
    this.selectedProductId = item[0];
  }

  checkLoggin(): boolean {
    return this._tokenService.exist();
  }


}
