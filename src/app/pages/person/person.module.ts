import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { FilterComponent } from 'src/app/components/filter/filter.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailModalComponent } from '../../components/modals/detail-modal/detail-modal.component';
import { PersonCreateEditComponent } from './person-create-edit/person-create-edit.component';
import { PersonViewComponent } from './person-view.component';
import { PersonService } from './services/person.service';




@NgModule({
  declarations: [
    PersonCreateEditComponent,
    PersonViewComponent,
    DetailModalComponent,
  
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    SharedModule
  ],
  providers:[PersonService]
})
export class PersonModule { }
