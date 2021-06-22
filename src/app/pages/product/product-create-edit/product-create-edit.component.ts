import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { CategoryOutpuMap } from 'src/app/models/interfaces/category.interface';
import { EntityOutPutMap } from 'src/app/models/interfaces/entity.interface';
import { PersonOutputMap } from 'src/app/models/interfaces/person.interface';
import { CategoryService } from '../../category/services/category.service';
import { EntityService } from '../../entity/services/entity.service';
import { PersonService } from '../../person/services/person.service';

@Component({
  selector: 'app-product-create-edit',
  templateUrl: './product-create-edit.component.html',
  styleUrls: ['./product-create-edit.component.css']
})
export class ProductCreateEditComponent implements OnInit {

  productForm: FormGroup;
  categoryList : CategoryOutpuMap[] = [];
  personList : PersonOutputMap[] = [];
  entityList: EntityOutPutMap[]=[];
  selectedCategories: Set<number> = new Set();
  selectedPersons: Set<number> = new Set();
  selectedEntities: Set<number> = new Set();


  constructor(private fb: FormBuilder, private _categoryService: CategoryService, private _entityService: EntityService
    , private _personService: PersonService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.formBuilder();
    this.getInitialValues();
  }

  formBuilder() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      creationDate: [''],
      endDate: [''],
      description: [''],
      imageUrl: [''],
      wikiUrl: [''],
      personsId: [''],
      categoriesId: [''],
      entitiesId: ['']
    });
  }

  onSubmit(){
    
  }

  getInitialValues(){
    this.getCategoryList();
    this.getEntityList();
    this.getPersonList();
  }

  getCategoryList(){
    this._categoryService.getCategories().subscribe( res => {
      const catField = {isCat: true};
      this.categoryList = res;
      this.addControlField(this.categoryList, catField);

    },err =>{
      console.log(err);
      this._snackBar.openFromComponent(SnackbarComponent, { data: 'An error occurs', duration: 3000 });

    })
  }

  getEntityList(){
    this._entityService.getEntityList().subscribe( res => {
      const catEntity = {isEntity: true};
      this.entityList = res;
      this.addControlField(this.entityList, catEntity);
    },err =>{
      console.log(err);
      this._snackBar.openFromComponent(SnackbarComponent, { data: 'An error occurs', duration: 3000 });
    })
  }

  getPersonList(){
    this._personService.getPersonList().subscribe( res => {
      const catPerson = {isPerson: true};
      this.personList = res;
      this.addControlField(this.personList, catPerson);
    },err =>{
      console.log(err);
      this._snackBar.openFromComponent(SnackbarComponent, { data: 'An error occurs', duration: 3000 });
    })
  }

  addControlField(list:any[], field:any){
    list.forEach(item => {
      Object.assign(item,field);
    })
  }

  getSelectedItem(item: any){

  }

  onClickDelete(item: any){

  }


}
