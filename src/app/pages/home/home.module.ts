import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCommonModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ModalRegisterComponent } from 'src/app/components/modals/modal-register/modal-register.component';
import { ModalTemplateComponent } from 'src/app/components/modals/modal-template/modal-template.component';
import { HomeViewComponent } from './home.component';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { ModalLoginComponent } from 'src/app/components/modals/modal-login/modal-login.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeViewComponent,
    ModalTemplateComponent,
    ModalRegisterComponent,
    ModalLoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    MatCommonModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule
    
  ],
  entryComponents:[ModalRegisterComponent],
  providers:[AuthService]
})
export class HomeModule { }
