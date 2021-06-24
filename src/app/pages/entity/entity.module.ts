import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EntityCreateEditComponent } from './entity-create-edit/entity-create-edit.component';
import { EntityDetailComponent } from './entity-detail/entity-detail.component';
import { EntityViewComponent } from './entity-view.component';
import { EntityService } from './services/entity.service';
import { EditDetailModalComponent } from './modals/edit-detail-modal/edit-detail-modal.component';



@NgModule({
  declarations: [
    EntityViewComponent,
    EntityCreateEditComponent,
    EntityDetailComponent,
    EditDetailModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers:[
    EntityService
  ]
})
export class EntityModule { }
