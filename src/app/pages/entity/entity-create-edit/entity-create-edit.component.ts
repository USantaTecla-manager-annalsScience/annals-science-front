import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-entity-create-edit',
  templateUrl: './entity-create-edit.component.html',
  styleUrls: ['./entity-create-edit.component.css']
})
export class EntityCreateEditComponent implements OnInit {

  entityForm: FormGroup;
  entityData = [{
    "id": 6,
    "name": "sergio",
    "surname": "garcia",
    "birthDate": null,
    "deathDate": "nuncaa",
    "description": "dees",
    "imageUrl": "imageUrl...",
    "wikiUrl": "wikiUrl...",
    "categories": [
      {
        "id": 5,
        "name": "casii5l5a9",
        "parentId": null
      }
    ]
  }];

  categoryData : any[] = [];

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
      deathDate: [''],
      description: [''],
      imageUrl: [''],
      wikiUrl: [''],
      personList: [''],
      categoryList: ['']
    });
  }

  setCategoryList(){
    this.entityData.forEach(item =>{
      this.categoryData = item['categories'];
    })
  }

}
