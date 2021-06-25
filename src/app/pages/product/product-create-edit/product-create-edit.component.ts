import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { Category } from 'src/app/models/interfaces/category.interface';
import { Entity } from 'src/app/models/interfaces/entity.interface';
import { Person } from 'src/app/models/interfaces/person.interface';
import { Product } from 'src/app/models/interfaces/product.interface';
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

  product: Product = {
    name:'',
    creationDate: '',
    endDate: '',
    description: '',
    imageUrl: '',
    wikiUrl:'',
    persons: [],
    categories: [],
    entities: []
  };

  categoryList : Category[] = [];
  personList : Person[] = [];
  entityList: Entity[]=[];
  selectedCategories: Set<number> = new Set();
  selectedPersons: Set<number> = new Set();
  selectedEntities: Set<number> = new Set();
  title = 'Crear Producto';
  productId: any;

  constructor(private fb: FormBuilder, private _categoryService: CategoryService, private _entityService: EntityService
    , private _personService: PersonService, private _snackBar: MatSnackBar, private _productService: ProductService,
    private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this.formBuilder();
    this.getInitialValues();
    if(this.productId){
      this.title = 'Modificar Producto'
      this.getProductById();
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
    (this.productId) ? this.updateProduct() : this.createProduct();
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

  getProductById(){
    this._productService.getProductById(this.productId).subscribe(res => {
      this.product = res;
      this.setInitialForm();
    })
  }

  
  setInitialForm() { 
    Object.keys(this.productForm.controls).forEach(key => {
      this.productForm.get(key).setValue(this.product[key] ?? '');
    }); 
    this.parseData(this.product,'categories','selectedCategories');
    this.parseData(this.product,'persons','selectedPersons');
    this.parseData(this.product,'entities','selectedEntities');

    this.productForm.updateValueAndValidity();
  }

  parseData(object: any, field: string, list: string){
    let set = new Set();
    const array: any[] = object[field];
    for(let item of array){
      set.add(item);
    }
    this[list] = set;
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
      this.categoryList = res;
    },err =>{
      console.log(err);
      this._snackBar.openFromComponent(SnackbarComponent, { data: 'An error occurs', duration: 3000 });

    })
  }
  getEntityList(){
    this._entityService.getEntityList().subscribe( res => {
      this.entityList = res;
    },err =>{
      console.log(err);
      this._snackBar.openFromComponent(SnackbarComponent, { data: 'An error occurs', duration: 3000 });
    })
  }

  getPersonList(){
    this._personService.getPersonList().subscribe( res => {
      this.personList = res;
    },err =>{
      console.log(err);
      this._snackBar.openFromComponent(SnackbarComponent, { data: 'An error occurs', duration: 3000 });
    })
  }


  createProduct(){
    this._productService.addProduct(this.productInput).subscribe(res =>{
      this._snackBar.openFromComponent(SnackbarComponent, { data: 'Product added', duration: 3000 });
      this.redirectProduct();
    },err =>{
      console.log(err);
      this._snackBar.openFromComponent(SnackbarComponent, { data: 'An error occurs', duration: 3000 });

    })
  }

  updateProduct(){
    this._productService.updateProduct(this.productInput,this.productId).subscribe(res => {
      this._snackBar.openFromComponent(SnackbarComponent, { data: "Product updated", duration: 3000 });
      this.redirectProduct();
    }, err => {
     
      this._snackBar.openFromComponent(SnackbarComponent, { data: "An error occurs", duration: 3000 });
      console.log(err);
    }); 
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

  redirectProduct(){
    setTimeout(()=>{
      this._router.navigate(['/product']);
    },3000);
  }

  


}
