import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from "../environments/environment";
import { ModalLoginComponent } from './components/modals/modal-login/modal-login.component';
import { ModalRegisterComponent } from './components/modals/modal-register/modal-register.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { User, UserInput } from './models/interfaces/user.interface';
import { HEADER_LOGIN, HEADER_REGISTER } from './pages/home/models/home-data-view';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'annals-science-front';
  url = environment.annalsScienceUrl;
  isLogged = false;
  userRegisteredInput: UserInput = {
    name: '',
    surname: '',
    email: '',
    password: ''
  };

  constructor(private modal: MatDialog, private _authService: AuthService, 
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.checkLogin();  
  }

  manageButtonsHeader(text: string) {

    const fn = {
      Login: 'openLoginModal',
      register: 'openRegisterModal',
      Logout: 'logoutUser'
    }

    const functionName = fn[text];
    this[functionName]();
  }

  logoutUser(){
    sessionStorage.removeItem('token');
    this.isLogged = false;
    this._snackBar.openFromComponent(SnackbarComponent, { data: "User logged out", duration: 3000 });
  }

  openRegisterModal() {
    const dialogRef = this.modal.open(ModalRegisterComponent, {
      width: '300px',
      data: {
        header: HEADER_REGISTER,
        title: 'Registro',
      }
    });

    dialogRef.afterClosed().subscribe((res: FormGroup) => {
      if(res){
        this.callbackRegistro(res);
      }
    },
   );
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
      sessionStorage.setItem('token',res);
      this.isLogged = true;
      
      this._snackBar.openFromComponent(SnackbarComponent, { data: "User logged", duration: 3000 });

    },
      err => {
        this._snackBar.openFromComponent(SnackbarComponent, { data: "An error occurs" , duration: 3000});
        console.log(err);
      }
    );

  }


  callbackRegistro(res: FormGroup) {
    Object.keys(this.userRegisteredInput).forEach(key=>{
      this.userRegisteredInput[key] = res.get(key)?.value;
    })
    this._authService.register(this.userRegisteredInput).subscribe(res => {
      this._snackBar.openFromComponent(SnackbarComponent, { data: "User registered", duration: 3000 });
    },err => {
      console.log(err);
      this._snackBar.openFromComponent(SnackbarComponent, { data: "An error occurs", duration: 3000 });

    })
  }

  getToken(): string{
    return sessionStorage.getItem('token');
  }

  checkLogin(){
    this.isLogged = this.getToken() ? true : false;
  }
}


