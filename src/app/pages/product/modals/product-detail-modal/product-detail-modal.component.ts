import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/interfaces/category.interface';
import { Entity } from 'src/app/models/interfaces/entity.interface';
import { Person } from 'src/app/models/interfaces/person.interface';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-product-detail-modal',
  templateUrl: './product-detail-modal.component.html',
  styleUrls: ['./product-detail-modal.component.css']
})
export class ProductDetailModalComponent implements OnInit {

  productObject: any[] = [];
  nameObject = {
    name: '',
    surname: ''
  }
  imgUrl: string;
  wikiUrl = {
    title: '',
    value: ''
  }
  productId: number;
  categories: Category[] = [];
  persons: Person[] = [];
  entities: Entity[] = [];
  constructor(public dialogRef: MatDialogRef<ProductDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private _tokenService: TokenService) { }

  ngOnInit(): void {
    console.log(this.data);
    this.createObject();
    this.createNameObject();
    this.wikiUrl = { title: 'Referencias:', value: (this.data.wikiUrl ?? '') };
    this.imgUrl = this.data.imgUrl;
    this.productId = this.data.id;
    Object.keys(this.data).forEach(key => {
      if (key === 'categories') {
        this.categories = this.data[key]
      }
      if (key === 'persons') {
        this.persons = this.data[key]
      }
      if (key === 'entities') {
        this.entities = this.data[key]
      }
    }
    );
  }

  createObject() {
    this.productObject = [
      { field: 'creationDate', title: 'Fecha de creación:', value: (this.data.creationDate ?? '') },
      { field: 'endDate', title: 'Fecha de finalización: ', value: (this.data.endDate ?? '') },
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
    this.dialogRef.close(this.productId);
  }

  checkLoggin() {
    return this._tokenService.exist();
  }

  onNavigate() {

  }


}
