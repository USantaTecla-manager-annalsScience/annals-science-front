import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/interfaces/category.interface';
import { Entity } from 'src/app/models/interfaces/entity.interface';
import { Person } from 'src/app/models/interfaces/person.interface';
import { Product } from 'src/app/models/interfaces/product.interface';
import { PersonDetailModalComponent } from 'src/app/pages/person/modals/person-detail-modal/detail-modal.component';
import { CategoryService } from '../category/services/category.service';
import { EditDetailModalComponent } from '../entity/modals/edit-detail-modal/edit-detail-modal.component';
import { EntityService } from '../entity/services/entity.service';
import { PersonService } from '../person/services/person.service';
import { ProductDetailModalComponent } from '../product/modals/product-detail-modal/product-detail-modal.component';
import { ProductService } from '../product/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeViewComponent implements OnInit {

  entities: Entity[] = [];
  persons: Person[] = [];
  products: Product[] = [];
  form: FormGroup = new FormGroup({});
  categoryList: Category [] = [];
  selectedCategory: Category;


  constructor(private _entityService: EntityService,
    private _productService: ProductService,
    private _personService: PersonService,
    private modal: MatDialog, private fb: FormBuilder,
    private _categoryService: CategoryService,
    private _router: Router) { }

  ngOnInit(): void {
    this.retrieveEntites();
    this.retrievePersons();
    this.retrieveProducts()
    this.retrieveCategories();
    this.formBuilder();
  }

  retrieveEntites() {
    this._entityService.getEntityList().subscribe(res => {
      this.entities = res.slice(0, 4);
    })
  }

  formBuilder() {
    this.form = this.fb.group({
      category: [null],
    })
  }

  retrievePersons() {
    this._personService.getPersonList().subscribe(res => {
      this.persons = res.slice(0, 4);
    })
  }

  retrieveProducts() {
    this._productService.getProductsList().subscribe(res => {
      this.products = res.slice(0, 4);
    })

  }

  showDetailEntity(entity: Entity) {
    const dialogRef = this.modal.open(EditDetailModalComponent, {
      width: '600px',
      data: entity
    });

    dialogRef.afterClosed().subscribe((entityId) => {
      if(entityId){
        this._router.navigate(['/entity-edit', entityId ]);
        this._entityService.setEntity(entity);
      }
    });
  }

  showDetailPerson(person: Person) {
    const dialogRef = this.modal.open(PersonDetailModalComponent, {
      width: '600px',
      data: person
    });

    dialogRef.afterClosed().subscribe((personId) => {
      if(personId){
        this._router.navigate(['/person-edit', personId ]);
        this._personService.setPerson(person);
      }
    });
  }

  showDetailProduct(product: Product) {
    const dialogRef = this.modal.open(ProductDetailModalComponent, {
      width: '600px',
      data: product
    });

    dialogRef.afterClosed().subscribe((productId) => {
      if(productId){
        this._router.navigate(['/product-edit', productId ]);
        this._productService.setProduct(product);
      }
    });
  }


  onSearch() {
    const cat = this.form.get('category').value ?? null;
    if (cat) {
      this.selectedCategory = this.categoryList.filter(value => value.name === cat)[0];
      this.getProductsBycat(cat);
      this.getEntityBycat(cat);
      this.getPersonBycat(cat);
    }
  }


  clean() {
    this.form.reset();
    this.resetSearch();
    this.form.updateValueAndValidity();
    this.selectedCategory = null;

  }

  resetSearch() {
    this.retrieveProducts();
    this.retrievePersons();
    this.retrieveEntites();
  }

  getProductsBycat(catName: string) {
    this._productService.getProductsByCategory(catName).subscribe(res => {
      this.products = res;
    })
  }

  getEntityBycat(catName: string) {
    this._entityService.getEntityByCategory(catName).subscribe(res => {
      this.entities = res;
    })
  }

  getPersonBycat(catName: string) {
    this._personService.getPersonsByCategory(catName).subscribe(res => {
      this.persons = res;
    });
  }

  retrieveCategories(){
    this._categoryService.getCategories().subscribe(data => {
      this.categoryList = data;
    })
  }

  setSelectedCategory(category: Category) {
    this.form.get('category').setValue(category.name);
    this.onSearch();
  }

}
