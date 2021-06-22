import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PersonCreateEditComponent } from './person-create-edit/person-create-edit.component';
import { PersonViewComponent } from './person-view.component';
import { PersonService } from './services/person.service';




@NgModule({
  declarations: [
    PersonCreateEditComponent,
    PersonViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[PersonService]
})
export class PersonModule { }
