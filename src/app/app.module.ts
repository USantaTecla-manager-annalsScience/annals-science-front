import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCommonModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterComponent } from './components/filter/filter.component';
import { ModalLoginComponent } from './components/modals/modal-login/modal-login.component';
import { ModalRegisterComponent } from './components/modals/modal-register/modal-register.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { CategoryModule } from './pages/category/category.module';
import { EntityModule } from './pages/entity/entity.module';
import { HomeModule } from './pages/home/home.module';
import { PersonModule } from './pages/person/person.module';
import { ProductModule } from './pages/product/product.module';
import { AuthService } from './services/auth.service';
import { AuthInterceptorService } from './services/interceptor.service';
import { SharedModule } from './shared/shared.module';



@NgModule({
  declarations: [
    AppComponent,
    ModalRegisterComponent,
    ModalLoginComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    MatCommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    HomeModule,
    EntityModule,
    PersonModule,
    CategoryModule,
    ProductModule,
    SharedModule
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }, 
  AuthService],
  entryComponents:[ModalRegisterComponent, SnackbarComponent],
  bootstrap: [AppComponent],
  exports:[FilterComponent]
})
export class AppModule { }
