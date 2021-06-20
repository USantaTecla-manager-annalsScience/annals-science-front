import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryCreateEditComponent } from './category-create-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CategoryCreateEditService } from './services/category-create-edit.service';



@NgModule({
  declarations: [CategoryCreateEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers:[CategoryCreateEditService]
})
export class CategoryCreateEditModule { }
