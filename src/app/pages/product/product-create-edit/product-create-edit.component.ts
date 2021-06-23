import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { CategoryOutpuMap } from 'src/app/models/interfaces/category.interface';
import { EntityOutPutMap } from 'src/app/models/interfaces/entity.interface';
import { PersonOutputMap } from 'src/app/models/interfaces/person.interface';
import { ProductInputMap } from 'src/app/models/interfaces/product.interface';
import { CategoryService } from '../../category/services/category.service';
import { EntityService } from '../../entity/services/entity.service';
import { PersonService } from '../../person/services/person.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-create-edit',
  templateUrl: './product-create-edit.component.html',
  styleUrls: ['./product-create-edit.component.css']
})
export class ProductCreateEditComponent implements OnInit {

  productForm: FormGroup;
  productInput: any = {
    name:'',
    creationDate: '',
    endDate: '',
    description: '',
    imageUrl: '',
    wikiUrl:'',
    personsId: [],
    categoriesId: [],
    entitiesId: []
  }
  categoryList : CategoryOutpuMap[] = [];
  personList : PersonOutputMap[] = [];
  entityList: EntityOutPutMap[]=[];
  selectedCategories: Set<number> = new Set();
  selectedPersons: Set<number> = new Set();
  selectedEntities: Set<number> = new Set();


  constructor(private fb: FormBuilder, private _categoryService: CategoryService, private _entityService: EntityService
    , private _personService: PersonService, private _snackBar: MatSnackBar, private _productService: ProductService) { }

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
    console.log('aqui');
    this.getProductInput();
    this.createProduct();
  }

  getInitialValues(){
    this.getCategoryList();
    this.getEntityList();
    this.getPersonList();
  }

  getProductInput(){
    Object.keys(this.productForm.controls).forEach(key =>{
      this.productInput[key] = this.productForm.get(key).value;
    })

    this.productInput['categoriesId'] = this.selectedCategories ? this.selectedCategories : '';
    this.productInput['personsId'] = this.selectedPersons ? this.selectedPersons : '';
    this.productInput['entitiesId'] = this.selectedEntities ? this.selectedEntities : '';


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

  createProduct(){
    this._productService.addProduct(this.productInput).subscribe(res =>{
      this._snackBar.openFromComponent(SnackbarComponent, { data: 'Product added', duration: 3000 });
     },err =>{
      console.log(err);
      this._snackBar.openFromComponent(SnackbarComponent, { data: 'An error occurs', duration: 3000 });

    })
  }

  getSelectedCategory(item: any){
    this.selectedCategories.add(item[0]);
  }

  getSelectedEntity(item: any){
    this.selectedEntities.add(item[0]);
  }

  getSelectedPerson(item: any){
    this.selectedPersons.add(item[0]);
  }

  onClickDelete(item: any, list:string){
    this[list].delete(item);
  }


}
