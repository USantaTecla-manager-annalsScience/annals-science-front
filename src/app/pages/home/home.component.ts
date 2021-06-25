import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PersonDetailModalComponent } from 'src/app/pages/person/modals/person-detail-modal/detail-modal.component';
import { ModalLoginComponent } from 'src/app/components/modals/modal-login/modal-login.component';
import { ModalRegisterComponent } from 'src/app/components/modals/modal-register/modal-register.component';
import { Entity } from 'src/app/models/interfaces/entity.interface';
import { Person } from 'src/app/models/interfaces/person.interface';
import { Product } from 'src/app/models/interfaces/product.interface';
import { User } from 'src/app/models/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { EditDetailModalComponent } from '../entity/modals/edit-detail-modal/edit-detail-modal.component';
import { EntityService } from '../entity/services/entity.service';
import { PersonService } from '../person/services/person.service';
import { ProductDetailModalComponent } from '../product/modals/product-detail-modal/product-detail-modal.component';
import { ProductService } from '../product/services/product.service';
import { DATA_ENTITY, HEADER_LOGIN, HEADER_REGISTER } from './models/home-data-view';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeViewComponent implements OnInit {

  entities: Entity[] = [];
  persons: Person[] = [];
  products: Product[] = [];

  constructor(private _entityService: EntityService,
              private _productService: ProductService,
              private _personService: PersonService,
              private modal: MatDialog) { }

  ngOnInit(): void {
    this.retrieveEntites();
    this.retrievePersons();
    this.retrieveProducts()
  }

  retrieveEntites() {
    this._entityService.getEntityList().subscribe(res => {
      this.entities = res.slice(0, 3);
    })
  }

  retrievePersons() {
    this._personService.getPersonList().subscribe(res => {
      this.persons = res.slice(0, 3);
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
    const dialogRef = this.modal.open(PersonDetailModalComponent, {
      width: '600px',
      data: person
    });
  }

  showDetailProduct(product: Product) {
    const dialogRef = this.modal.open(ProductDetailModalComponent, {
      width: '600px',
      data: product
    });
  }

}
