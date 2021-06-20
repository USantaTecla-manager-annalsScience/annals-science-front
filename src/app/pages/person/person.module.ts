import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PersonCreateEditModule } from './person-create-edit/person-create-edit.module';
import { PersonService } from './services/person.service';




@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PersonCreateEditModule,
    RouterModule,
  ],
  providers:[PersonService]
})
export class PersonModule { }
