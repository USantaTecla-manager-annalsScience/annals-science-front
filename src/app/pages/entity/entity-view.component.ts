import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { EntityOutPutMap } from 'src/app/models/interfaces/entity.interface';
import { TokenService } from 'src/app/services/token.service';
import { EntityService } from './services/entity.service';

@Component({
  selector: 'app-entity',
  templateUrl: './entity-view.component.html',
  styleUrls: ['./entity-view.component.css']
})
export class EntityViewComponent implements OnInit {

  constructor(private _entityService: EntityService, private _snackBar: MatSnackBar, private _tokenService: TokenService,
    ) { }

  entityList: EntityOutPutMap [] = [];
  selectedEntityId: any;


  ngOnInit(): void {
    this.getEntityList();
  }

  getEntityList(){
    this._entityService.getEntityList().subscribe( res => {
      this.entityList = res;
    },err =>{
      console.log(err);
      this._snackBar.openFromComponent(SnackbarComponent, { data: 'An error occurs', duration: 3000 });
    });
  }
  
  getSelectedItem(item){
    this.selectedEntityId = item[0];
  }

  checkLoggin(): boolean {
    return this._tokenService.exist();
  }


}
