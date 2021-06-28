import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductDetailModalComponent } from './modals/product-detail-modal/product-detail-modal.component';
import { ProductCreateEditComponent } from './product-create-edit/product-create-edit.component';
import { ProductViewComponent } from './product-view.component';
import { ProductService } from './services/product.service';


@NgModule({
  declarations: [
    ProductViewComponent,
    ProductCreateEditComponent,
    ProductDetailModalComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers:[
    ProductService
  ]
})
export class ProductModule { }
