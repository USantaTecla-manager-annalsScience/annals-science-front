import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DetailModalComponent } from 'src/app/components/modals/detail-modal/detail-modal.component';
import { Category } from 'src/app/models/interfaces/category.interface';
import { Entity } from 'src/app/models/interfaces/entity.interface';
import { Person } from 'src/app/models/interfaces/person.interface';
import { Product } from 'src/app/models/interfaces/product.interface';
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
      this.entities = res.slice(0, 3);
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
      this.products = res.slice(0, 3);
    })
  }

  showDetailEntity(entity: Entity) {
    const dialogRef = this.modal.open(EditDetailModalComponent, {
      width: '600px',
      data: entity
    });
  }

  showDetailPerson(person: Person) {
    const dialogRef = this.modal.open(DetailModalComponent, {
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
  }


  onSearch() {
    const cat = this.form.get('category').value ?? null;
    if (cat) {
      this.getProductsBycat(cat);
      this.getEntityBycat(cat);
      this.getPersonBycat(cat);
    }
  }


  clean() {
    this.form.reset();
    this.resetSearch();
    this.form.updateValueAndValidity();

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

}
