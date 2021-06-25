import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { Category } from 'src/app/models/interfaces/category.interface';
import { Entity } from 'src/app/models/interfaces/entity.interface';
import { Person } from 'src/app/models/interfaces/person.interface';
import { CategoryService } from '../../category/services/category.service';
import { PersonService } from '../../person/services/person.service';
import { EntityService } from '../services/entity.service';

@Component({
  selector: 'app-entity-create-edit',
  templateUrl: './entity-create-edit.component.html',
  styleUrls: ['./entity-create-edit.component.css']
})
export class EntityCreateEditComponent implements OnInit {

  entityForm: FormGroup;
  entityInput: any = {
    name: '',
    creationDate: '',
    endDate: '',
    description: '',
    imageUrl: '',
    wikiUrl: '',
    personsId: [],
    categoriesId: []
  };

  entity: Entity = {
    id:null,
    name: '',
    creationDate: '',
    endDate: '',
    description: '',
    imageUrl: '',
    wikiUrl: '',
    persons: [],
    categories: []
  }
  categoryList: Category[] = [];
  personList: Person[] = [];
  entityList: Entity[] = [];
  selectedCategories: Set<number> = new Set();
  selectedPersons: Set<number> = new Set();
  entityId: any;
  title = 'Crear Entidad';



  constructor(private fb: FormBuilder, private _categoryService: CategoryService, private _snackBar: MatSnackBar,
    private _personService: PersonService, private _router: Router, private _entityService: EntityService, private _route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.formBuilder();
    this.getInitialData();
    if (this.entityId) {
      this.title = 'Modificar Entidad'
      this.getEntityById();

    }
  }

  formBuilder() {
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

  getEntityById(){
    this._entityService.getEntityById(this.entityId).subscribe(res => {
      this.entity = res;
      this.setInitialForm();
    })
  }

  getEntryId() {
    this.entityId = this._route.snapshot.paramMap.get('id') ?? null;
  }


  getInitialData() {
    this.getCategoryList();
    this.getPersonList();
    this.getEntryId();
  }

  getCategoryList() {
    this._categoryService.getCategories().subscribe(res => {
      this.categoryList = res;
    }, err => {
      console.log(err);
      this._snackBar.openFromComponent(SnackbarComponent, { data: 'An error occurs', duration: 3000 });

    })
  }


  setInitialForm() {
    Object.keys(this.entityForm.controls).forEach(key => {
      this.entityForm.get(key).setValue(this.entity[key] ?? '');
    });
    this.parseData(this.entity,'categories','selectedCategories');
    this.parseData(this.entity,'persons','selectedPersons');

    this.entityForm.updateValueAndValidity();
  }

  parseData(object: any, field: string, list: string){
    let set = new Set();
    const array: any[] = object[field];
    for(let item of array){
      set.add(item);
    }
    this[list] = set;
  }


  getPersonList() {
    this._personService.getPersonList().subscribe(res => {
      this.personList = res;
    }, err => {
      console.log(err);
      this._snackBar.openFromComponent(SnackbarComponent, { data: 'An error occurs', duration: 3000 });
    })
  }


  getSelectedCategory(item: any) {
    this.selectedCategories.add(item[0]);

  }

  getSelectedPerson(item: any) {
    this.selectedPersons.add(item[0]);

  }

  onClickDelete(item: any, list: string) {
    (list === 'personList') ? this.deletePersonRelated(item) : this.deleteCategoryRelated(item);
  }

  deletePersonRelated(item){
    this.selectedPersons.delete(item);
  }

  deleteCategoryRelated(item){
    this.selectedCategories.delete(item);
  }

  onSubmit() {
    this.getEntityInput();
    (this.entityId) ? this.updateEntity() : this.createEntity();
  }

  createEntity() {
    this._entityService.addEntity(this.entityInput).subscribe(res => {
      this._snackBar.openFromComponent(SnackbarComponent, { data: 'Entity added', duration: 3000 });
      this.redirectEntity();
    }, err => {
      console.log(err);
      this._snackBar.openFromComponent(SnackbarComponent, { data: 'An error occurs', duration: 3000 });

    })
  }

  updateEntity(){
    this._entityService.updateEntity(this.entityInput,this.entityId).subscribe(res => {
      this._snackBar.openFromComponent(SnackbarComponent, { data: "Entity updated", duration: 3000 });
      this.redirectEntity();
    }, err => {

      this._snackBar.openFromComponent(SnackbarComponent, { data: "An error occurs", duration: 3000 });
      console.log(err);
    });
  }

  getEntityInput() {
    Object.keys(this.entityForm.controls).forEach(key => {
      this.entityInput[key] = this.entityForm.get(key)?.value;
    })

    this.entityInput['categoriesId'] = this.selectedCategories ? this.selectedCategories : '';
    this.entityInput['personsId'] = this.selectedPersons ? this.selectedPersons : '';

  }

  redirectEntity(){
    setTimeout(()=>{
      this._router.navigate(['/entity']);
    },1000);
  }

}
