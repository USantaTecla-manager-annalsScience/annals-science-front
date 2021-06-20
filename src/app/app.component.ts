import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from "../environments/environment";
import { ModalLoginComponent } from './components/modals/modal-login/modal-login.component';
import { ModalRegisterComponent } from './components/modals/modal-register/modal-register.component';
import { User } from './models/interfaces/user.interface';
import { HEADER_REGISTER, HEADER_LOGIN } from './pages/home/models/home-data-view';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'annals-science-front';
  url = environment.annalsScienceUrl;
  loggedButton = false;

  constructor(private modal: MatDialog, private _authService: AuthService, private _snackBar: MatSnackBar) { }


  manageButtonsHeader(text: string) {
    if (text === 'Login') {
      this.openLoginModal();
    } else if (text === 'register') {
      this.openRegisterModal();
    } else {
      this.loggedButton = !this.loggedButton;
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
      if (res) {
        this.callbackRegistro(res);
      }
    });
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
      if (res) {
        this.callbackLogin(res);
      }
    });
  }

  callbackLogin(res?: any) {
    
    const inputUser: User = {
      email: res.value.email,
      password: res.value.password
    };

    this._authService.login(inputUser).subscribe(res => {
      console.log('estado', res.status);
      this.loggedButton = true;
      this._snackBar.open('User logged', 'Close')

    },
      err => {
        this._snackBar.open('An error occurs', 'Close')

       
      }
    );

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
}


