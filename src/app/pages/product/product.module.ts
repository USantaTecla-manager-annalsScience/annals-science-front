import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FilterComponent } from 'src/app/components/filter/filter.component';
import { ProductDetailModalComponent } from './modals/product-detail-modal/product-detail-modal.component';
import { ProductCreateEditComponent } from './product-create-edit/product-create-edit.component';
import { ProductViewComponent } from './product-view.component';
import { ProductService } from './services/product.service';



@NgModule({
  declarations: [
    ProductViewComponent,
    ProductCreateEditComponent,
    ProductDetailModalComponent,
    FilterComponent
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
