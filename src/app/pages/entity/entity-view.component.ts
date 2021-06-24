import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { Entity } from 'src/app/models/interfaces/entity.interface';
import { TokenService } from 'src/app/services/token.service';
import { EditDetailModalComponent } from './modals/edit-detail-modal/edit-detail-modal.component';
import { EntityService } from './services/entity.service';

@Component({
  selector: 'app-entity',
  templateUrl: './entity-view.component.html',
  styleUrls: ['./entity-view.component.css']
})
export class EntityViewComponent implements OnInit {

  messageError = 'An error occurs';
  entityList: Entity [] = [];
  selectedEntityId: any;

  constructor(private _entityService: EntityService, private _snackBar: MatSnackBar, private _tokenService: TokenService,
    private modal: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this._entityService.clearEntity();
    this.getEntityList();
  }

  getEntityList(){
    this._entityService.getEntityList().subscribe( res => {
      this.entityList = res;
    },err =>{
      console.log(err)
      if (err.status === 401) {
        this.messageError = "You don't have permission for this operation";
      }
      this._snackBar.openFromComponent(SnackbarComponent, { data: this.messageError, duration: 3000 });
    });
  }
  
  getSelectedItem(item){
    this.selectedEntityId = item;
  }

  checkLoggin(): boolean {
    return this._tokenService.exist();
  }

  async openModal() {
    const currentEntity = await this.getSelectedEntity();
    const dialogRef = this.modal.open(EditDetailModalComponent, {
      width: '600px',
      data: currentEntity
      
    });

    dialogRef.afterClosed().subscribe((entityId) => {
      if(entityId){
        this.router.navigate(['/entity-edit', entityId ]);
        this._entityService.setEntity(currentEntity);
      }

      this.selectedEntityId = null;
    });
  }

  getSelectedEntity() { 
    return this._entityService.getEntityById(this.selectedEntityId).toPromise();
  }

  onDeleteEntity(entityId){
    this._entityService.deleteEntityById(entityId).subscribe(res =>{
      this._snackBar.openFromComponent(SnackbarComponent, { data: 'Entity deleted', duration: 3000 });
      this.getEntityList();

    },err => {
      console.log(err);
      this._snackBar.openFromComponent(SnackbarComponent, { data: 'An error occurs', duration: 3000 });
    });
  }


}
