import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCommonModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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
import { CategoryCreateEditModule } from './pages/category-create-edit/category-create-edit.module';
import { EntityCreateEditModule } from './pages/entity-create-edit/entity-create-edit.module';
import { EntityDetailModule } from './pages/entity/entity-detail/entity-detail.module';
import { EntityViewModule } from './pages/entity/entity.module';
import { HomeModule } from './pages/home/home.module';
import { AuthInterceptorService } from './services/interceptor.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    FooterComponent,
    ModalTemplateComponent,
    ModalRegisterComponent,
    ModalLoginComponent,
    HeaderComponent,
    

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HomeModule,
    BrowserAnimationsModule,
    EntityViewModule,
    EntityCreateEditModule,
    EntityDetailModule,
    CategoryCreateEditModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    MatCommonModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  entryComponents:[ModalRegisterComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
