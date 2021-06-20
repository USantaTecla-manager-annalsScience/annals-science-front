import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-entity-create-edit',
  templateUrl: './entity-create-edit.component.html',
  styleUrls: ['./entity-create-edit.component.css']
})
export class EntityCreateEditComponent implements OnInit {

  entityForm: FormGroup;
  entityData : any [] = [];
  categoryData : any[] = [];
  personData : any[] = [];


  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formBuilder();
    this.setCategoryList();
  }

  formBuilder(){
    this.entityForm = this.fb.group({
      name: ['', Validators.required],
      creationDate: [''],
      endDate: [''],
      description: [''],
      imageUrl: [''],
      wikiUrl: [''],
      personsId: [''],
      categoriesId: ['']
    });
  }

  setCategoryList(){
    this.entityData.forEach(item =>{
      this.categoryData = item['categories'];
    })
  }

}
