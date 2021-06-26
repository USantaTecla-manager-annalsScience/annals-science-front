import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/interfaces/category.interface';
import { Person } from 'src/app/models/interfaces/person.interface';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-edit-detail-modal',
  templateUrl: './edit-detail-modal.component.html',
  styleUrls: ['./edit-detail-modal.component.css']
})
export class EditDetailModalComponent implements OnInit {

  entityObject: any[] = [];
  nameObject = {
    name: '',
    surname: ''
  }
  imgUrl: string;
  wikiUrl = {
    title: '',
    value: ''
  }
  entityId: number;
  categories: Category[] = [];
  persons: Person[] = [];
  constructor(public dialogRef: MatDialogRef<EditDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private _tokenService: TokenService) { }

  ngOnInit(): void {
    this.createObject();
    this.createNameObject();
    this.wikiUrl = { title: 'Referencias:', value: (this.data.wikiUrl ?? '') };
    this.imgUrl = this.data.imgUrl;
    this.entityId = this.data.id;
    Object.keys(this.data).forEach(key => {
      if (key === 'categories') {
        this.categories = this.data[key];
      }
      if (key === 'persons') {
        this.persons = this.data[key]
      }
    }
    );
  }

  createObject() {
    this.entityObject = [
      { field: 'birthDate', title: 'Fecha de creación:', value: (this.data.creationDate ?? '') },
      { field: 'deathDate', title: 'Fecha de finalización: ', value: (this.data.endDate ?? '') },
      { field: 'description', title: 'Descripción: ', value: this.data.description ?? '' }]
  }

  createNameObject() {
    this.nameObject = {
      name: this.data.name ?? '',
      surname: this.data.surname ?? ''
    };
  }

  close() {
    this.dialogRef.close();
  }

  onClickEdit() {
    this.dialogRef.close(this.entityId);
  }

  checkLoggin() {
    return this._tokenService.exist();
  }

  onNavigate() {

  }


}
