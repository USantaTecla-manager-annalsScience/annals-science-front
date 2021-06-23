import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalLoginComponent } from 'src/app/components/modals/modal-login/modal-login.component';
import { ModalRegisterComponent } from 'src/app/components/modals/modal-register/modal-register.component';
import { User } from 'src/app/models/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DATA_ENTITY, HEADER_LOGIN, HEADER_REGISTER } from './models/home-data-view';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeViewComponent implements OnInit {

  _dataEntity = DATA_ENTITY;


  constructor() { }

  ngOnInit(): void {
  }

}
