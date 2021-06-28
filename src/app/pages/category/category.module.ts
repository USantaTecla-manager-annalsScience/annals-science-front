import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CategoryService } from './services/category.service';
import { CategoryViewComponent } from './category-view.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    CategoryCreateComponent,
    CategoryViewComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
    
  ],
  providers: [
    CategoryService
  ]
})
export class CategoryModule { }
