import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
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
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    SharedModule,
    MatSnackBarModule
  ],
  providers:[PersonService]
})
export class PersonModule { }
