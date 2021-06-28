import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { EntityCreateEditComponent } from './entity-create-edit/entity-create-edit.component';
import { EntityViewComponent } from './entity-view.component';
import { EditDetailModalComponent } from './modals/edit-detail-modal/edit-detail-modal.component';
import { EntityService } from './services/entity.service';



@NgModule({
  declarations: [
    EntityViewComponent,
    EntityCreateEditComponent,
    EditDetailModalComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers:[
    EntityService
  ]
})
export class EntityModule { }
