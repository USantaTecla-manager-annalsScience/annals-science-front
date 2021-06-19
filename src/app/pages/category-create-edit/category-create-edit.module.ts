import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryCreateEditComponent } from './category-create-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CategoryCreateEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class CategoryCreateEditModule { }
