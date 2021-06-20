import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { PersonService } from '../services/person.service';
import { PersonCreateEditComponent } from './person-create-edit.component';



@NgModule({
  declarations: [
    PersonCreateEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[
    CategoryService, PersonService
  ]
})
export class PersonCreateEditModule { }
