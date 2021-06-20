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
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterComponent } from './components/filter/filter.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ModalLoginComponent } from './components/modals/modal-login/modal-login.component';
import { ModalRegisterComponent } from './components/modals/modal-register/modal-register.component';
import { ModalTemplateComponent } from './components/modals/modal-template/modal-template.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { CategoryCreateEditModule } from './pages/category/category-create-edit/category-create-edit.module';
import { EntityCreateEditModule } from './pages/entity/entity-create-edit/entity-create-edit.module';
import { EntityDetailModule } from './pages/entity/entity-detail/entity-detail.module';
import { EntityViewModule } from './pages/entity/entity.module';
import { HomeModule } from './pages/home/home.module';
import { PersonComponent } from './pages/person/person.component';
import { PersonModule } from './pages/person/person.module';
import { AuthInterceptorService } from './services/interceptor.service';



@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    HeaderComponent,
    FooterComponent,
    ModalTemplateComponent,
    ModalRegisterComponent,
    ModalLoginComponent,
    SnackbarComponent,
    PersonComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HomeModule,
    EntityViewModule,
    EntityCreateEditModule,
    EntityDetailModule,
    CategoryCreateEditModule,
    PersonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    MatCommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  entryComponents:[ModalRegisterComponent, SnackbarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
