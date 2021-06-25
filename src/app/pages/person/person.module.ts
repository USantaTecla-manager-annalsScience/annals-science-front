import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { PersonDetailModalComponent } from './modals/person-detail-modal/detail-modal.component';
import { PersonCreateEditComponent } from './person-create-edit/person-create-edit.component';
import { PersonViewComponent } from './person-view.component';
import { PersonService } from './services/person.service';




@NgModule({
  declarations: [
    PersonCreateEditComponent,
    PersonViewComponent,
    PersonDetailModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers:[PersonService]
})
export class PersonModule { }
