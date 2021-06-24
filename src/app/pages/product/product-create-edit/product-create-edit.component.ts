import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { CategoryOutpuMap } from 'src/app/models/interfaces/category.interface';
import { Entity } from 'src/app/models/interfaces/entity.interface';
import { Person } from 'src/app/models/interfaces/person.interface';
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
  personList : Person[] = [];
  entityList: Entity[]=[];
  selectedCategories: Set<number> = new Set();
  selectedPersons: Set<number> = new Set();
  selectedEntities: Set<number> = new Set();
  title = 'Crear Producto';
  productId: any;

  constructor(private fb: FormBuilder, private _categoryService: CategoryService, private _entityService: EntityService
    , private _personService: PersonService, private _snackBar: MatSnackBar, private _productService: ProductService,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.formBuilder();
    this.getInitialValues();
    if(this.productId){
      this.title = 'Modificar Producto'
    }
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
    this.getProductInput();
    this.createProduct();
  }

  getInitialValues(){
    this.getCategoryList();
    this.getEntityList();
    this.getPersonList();
    this.getEntryId();
  
  }

  getEntryId() {
    this.productId = this._route.snapshot.paramMap.get('id') ?? null;
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
