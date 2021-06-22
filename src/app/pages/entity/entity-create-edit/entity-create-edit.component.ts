import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { categoryOutpuMap as CategoryOutpuMap } from 'src/app/models/interfaces/category.interface';
import { EntityInputMap } from 'src/app/models/interfaces/entity.interface';
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
  entityInput : any = {
    name:'',
    creationDate: '',
    endDate: '',
    description: '',
    imageUrl: '',
    wikiUrl:'',
    personsId: [],
    categoriesId: []
  };
  categoryList : CategoryOutpuMap[] = [];
  personList : PersonOutputMap[] = [];
  selectedCategories: Set<number> = new Set();
  selectedPersons: Set<number> = new Set();



  constructor(private fb: FormBuilder, private _categoryService: CategoryService, private _snackBar: MatSnackBar,
    private _personService: PersonService, private _entityService: EntityService) {
  }

  ngOnInit(): void {
    this.formBuilder();
    this.getCategoryList();
    this.getPersonList();
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

  getCategoryList(){
    this._categoryService.getCategories().subscribe(res => {
      const catField = {isCat: true};
      this.categoryList = res;
      this.addControlField(this.categoryList, catField);
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

  getPersonList(){
    this._personService.getPersonList().subscribe(res => {
        this.personList = res;
     },err =>{
      console.log(err);
      this._snackBar.openFromComponent(SnackbarComponent, { data: 'An error occurs', duration: 3000 });
    })
  }
  

  getSelectedItem(item: any){
    if(item[0].isCat){
      this.selectedCategories.add(item[0]);
    }else{
      this.selectedPersons.add(item[0]);
    }
  }

  onClickDelete(item){
    if(item.isCat){
      this.selectedCategories.delete(item);
    }else{
      this.selectedPersons.delete(item);
    }
  }

  onSubmit(){
    this.getEntityInput();
    this._entityService.addEntity(this.entityInput).subscribe(res =>{
      this._snackBar.openFromComponent(SnackbarComponent, { data: 'Entity added', duration: 3000 });
     },err =>{
      console.log(err);
      this._snackBar.openFromComponent(SnackbarComponent, { data: 'An error occurs', duration: 3000 });

    })
  }

  getEntityInput(){
    Object.keys(this.entityForm.controls).forEach(key =>{
      this.entityInput[key] = this.entityForm.get(key).value;
    })

    this.entityInput['categoriesId'] = this.selectedCategories ? this.selectedCategories : '';
    this.entityInput['personsId'] = this.selectedPersons ? this.selectedPersons : '';

  }

}
