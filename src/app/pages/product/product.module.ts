import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductViewComponent } from './product-view.component';
import { ProductCreateEditComponent } from './product-create-edit/product-create-edit.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './services/product.service';
import { ProductDetailModalComponent } from './modals/product-detail-modal/product-detail-modal.component';



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
