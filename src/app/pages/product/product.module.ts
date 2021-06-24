import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductDetailModalComponent } from './modals/product-detail-modal/product-detail-modal.component';
import { ProductCreateEditComponent } from './product-create-edit/product-create-edit.component';
import { ProductViewComponent } from './product-view.component';
import { ProductService } from './services/product.service';



@NgModule({
  declarations: [
    ProductViewComponent,
    ProductCreateEditComponent,
    ProductDetailModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[
    ProductService
  ]
})
export class ProductModule { }
