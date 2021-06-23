import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { PersonCreateEditComponent } from './person-create-edit/person-create-edit.component';
import { PersonViewComponent } from './person-view.component';
import { PersonService } from './services/person.service';
import { DetailModalComponent } from './person-detail/detail-modal/detail-modal.component';




@NgModule({
  declarations: [
    PersonCreateEditComponent,
    PersonViewComponent,
    DetailModalComponent
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
