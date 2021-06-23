import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { CategoryOutpuMap as CategoryOutpuMap } from 'src/app/models/interfaces/category.interface';
import { EntityOutPutMap } from 'src/app/models/interfaces/entity.interface';
import { PersonOutputMap } from 'src/app/models/interfaces/person.interface';
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
  categoryList: CategoryOutpuMap[] = [];
  personList: PersonOutputMap[] = [];
  entityList: EntityOutPutMap[] = [];
  selectedCategories: Set<number> = new Set();
  selectedPersons: Set<number> = new Set();
  entityId: any;
  title = 'Crear Entidad';



  constructor(private fb: FormBuilder, private _categoryService: CategoryService, private _snackBar: MatSnackBar,
    private _personService: PersonService, private _entityService: EntityService, private _route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.formBuilder();
    this.getInitialData();
    if (this.entityId) {
      this.title = 'Modificar Entidad'
      this.setInitialForm();

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

  getEntryId() {
    this.entityId = this._route.snapshot.paramMap.get('id') ?? null;
  }

  setInitialValues(entity: EntityOutPutMap) {
    this.entityInput = {
      name : entity.name,
      creationDate: entity.creationDate,
      endDate: entity.endDate,
      description : entity.description,
      imageUrl: entity.imageUrl,
      wikiUrl: entity.wikiUrl,
      personsId: this.getPersonsId(entity),
      categoriesId: this.getCategoriesId(entity)
    }
    Object.keys(this.entityForm.controls).forEach(key => {
      this.entityForm.get(key)?.setValue(this.entityInput[key] ?? '');
    });
  }

  getPersonsId(entity: EntityOutPutMap): Array<number>{
    const relatedPersonsId = entity.persons.map(item => item.id) ?? [];
    relatedPersonsId.forEach(id => {
      this.selectedPersons.add(id);
    })
    return relatedPersonsId
  }

  getCategoriesId(entity: any){

    const relatedCategoriesId = entity.categories.map(item => item.id) ?? []; 
    relatedCategoriesId.forEach(id => {
      this.selectedCategories.add(id);
    }) //gestionar que el array de categorias relacionadas esté vacio
    return relatedCategoriesId
  }

  searchEntity(): EntityOutPutMap {
    return this.entityList.find(item => item?.id == this.entityId) ?? null;
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
    this._entityService.getEntityList().subscribe(res => {
      this.entityList = res;
      const entity: EntityOutPutMap = this.searchEntity();
      if (entity) {
        this.setInitialValues(entity);
      }
    }, err => {
      console.log(err);
      this._snackBar.openFromComponent(SnackbarComponent, { data: 'An error occurs', duration: 3000 });
    });
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
    this[list].delete(item);
  }


  onSubmit() {
    this.getEntityInput();
    this.createEntity();
  }

  createEntity() {
    this._entityService.addEntity(this.entityInput).subscribe(res => {
      this._snackBar.openFromComponent(SnackbarComponent, { data: 'Entity added', duration: 3000 });
    }, err => {
      console.log(err);
      this._snackBar.openFromComponent(SnackbarComponent, { data: 'An error occurs', duration: 3000 });

    })
  }

  getEntityInput() {
    Object.keys(this.entityForm.controls).forEach(key => {
      this.entityInput[key] = this.entityForm.get(key).value;
    })

    this.entityInput['categoriesId'] = this.selectedCategories ? this.selectedCategories : '';
    this.entityInput['personsId'] = this.selectedPersons ? this.selectedPersons : '';

  }

}
