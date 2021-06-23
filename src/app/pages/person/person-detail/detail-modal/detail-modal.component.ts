import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  constructor(public dialogRef: MatDialogRef<DetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) { }

  ngOnInit(): void {
    this.createObject();
    this.createNameObject();
    this.wikiUrl = {title: 'Referencias:' , value: this.data.person[0].wikiUrl + (this.data.person[0].wikiUrl ?? '' )};
    this.imgUrl = this.data.person[0].imgUrl;
    this.personId = this.data.person[0].id;
  }

  createObject() {
    this.personObject = [
      { field: 'birthDate', title:'Fecha de creación:', value: (this.data.person[0].birthDate ?? '') },
      { field: 'endDate', title: 'Fecha de muerte: ', value:  (this.data.person[0].deathDate ?? '')},
      { field: 'description', title: 'Descripción: ' , value: this.data.person[0].description ?? ''}]
  }

  createNameObject(){
    this.nameObject = {
      name : this.data.person[0].name ?? '' ,
      surname: this.data.person[0].surname ?? ''  
    };
  }

  close() {
    this.dialogRef.close();
  }

  onClickEdit(){
    this.router.navigate(['/person-edit', this.personId ]);
    this.dialogRef.close();
  }

}
