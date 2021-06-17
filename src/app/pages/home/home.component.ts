import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalRegisterComponent } from 'src/app/components/modals/modal-register/modal-register.component';
import { ModalLoginComponent } from 'src/app/components/modals/modal-login/modal-login.component';
import { User, UserInput } from 'src/app/models/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DATA_ENTITY, HEADER_LOGIN, HEADER_REGISTER } from './models/home-data-view';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeViewComponent implements OnInit {

  _dataEntity = DATA_ENTITY;


  constructor(private modal: MatDialog, private _authService: AuthService) { }

  ngOnInit(): void {
  }

  manageButtonsHeader(text: string) {
    if (text === 'login') {
      this.openLoginModal();
    } else {
      this.openRegisterModal();
    }
  }

  openRegisterModal() {
    const dialogRef = this.modal.open(ModalRegisterComponent, {
      width: '300px',
      data: {
        header: HEADER_REGISTER,
        title: 'Registro',
      }
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      this.callbackRegistro(res);
    });
  }

  callbackLogin(res?: any) {
    const inputUser: User = {
      email: res.value.email,
      password: res.value.password
    };

    this._authService.login(inputUser).subscribe(res => {
      console.log(res);
    })
  }

  callbackRegistro(res?: any) {
    const inputUser: User = {
      email: res.value.email,
      name: res.value.name,
      surname: res.value.surname,
      password: res.value.password
    }

    this._authService.register(inputUser).subscribe(res => {
      console.log(res);
    })
  }

  openLoginModal() {
    const dialogRef = this.modal.open(ModalLoginComponent, {
      width: '300px',
      data: {
        header: HEADER_LOGIN,
        title: 'Inicio de Sesión',
      }
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      console.log(res);
      this.callbackRegistro(res);
    });
  }
}
