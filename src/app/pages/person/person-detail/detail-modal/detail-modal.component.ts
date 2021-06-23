import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.css']
})
export class DetailModalComponent implements OnInit {

  personObject: any = [{
    surname: '',
    birthDate: '',
    deathDate: '',
    description: '',
  }]
  name: string;
  imgUrl: string;
  wikiUrl: string;
  personId: number;
  constructor(public dialogRef: MatDialogRef<DetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) { }

  ngOnInit(): void {
    this.createObject();
    console.log(this.personObject);
    this.name = this.data.person[0].name + (this.data.person[0].surname ?? '' ) ;
    this.imgUrl = this.data.person[0].imgUrl;
    this.personId = this.data.person[0].id;
  }

  createObject() {
    this.personObject = [
      { field: 'date', value: (this.data.person[0].birthDate ?? '')+' - '+(this.data.person[0].deathDate ?? '') },
      { field: 'description', value: this.data.person[0].description ?? ''}]
  }

  close() {
    this.dialogRef.close();
  }

  onClickEdit(){
    this.router.navigate(['/person-edit', this.personId ]);
    this.dialogRef.close();
  }

}
