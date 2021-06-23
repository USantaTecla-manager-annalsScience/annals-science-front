import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.css']
})
export class DetailModalComponent implements OnInit {

  personObject: any[] = [];
  nameObject = {
    name:'',
    surname:''
  } 
  imgUrl: string;
  wikiUrl = {
    title:'',
    value:''
  }
  personId: number;
  categories: string[] = [];
  constructor(public dialogRef: MatDialogRef<DetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private _tokenService: TokenService) { }

  ngOnInit(): void {
    console.log('modal data',this.data);
    this.createObject();
    this.createNameObject();
    this.wikiUrl = {title: 'Referencias:' , value: this.data.wikiUrl + (this.data.wikiUrl ?? '' )};
    this.imgUrl = this.data.imgUrl;
    this.personId = this.data.id;
    Object.keys(this.data).forEach(key => {
      if(key === 'categories'){ this.categories = this.data[key]; }
    })
  }

  createObject() {
    this.personObject = [
      { field: 'birthDate', title:'Fecha de creación:', value: (this.data.birthDate ?? '') },
      { field: 'deathDate', title: 'Fecha de muerte: ', value:  (this.data.deathDate ?? '')},
      { field: 'description', title: 'Descripción: ' , value: this.data.description ?? ''}]
  }

  createNameObject(){
    this.nameObject = {
      name : this.data.name ?? '' ,
      surname: this.data.surname ?? ''  
    };
  }

  close() {
    this.dialogRef.close();
  }

  onClickEdit(){
    this.dialogRef.close(this.personId);
  }

  checkLoggin(){
    return this._tokenService.exist();
  }

}
