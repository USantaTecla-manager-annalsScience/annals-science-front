import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonCreateEditModule } from './person-create-edit/person-create-edit.module';
import { PersonService } from './services/person.service';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PersonCreateEditModule,
    RouterModule
  ],
  providers:[PersonService]
})
export class PersonModule { }
