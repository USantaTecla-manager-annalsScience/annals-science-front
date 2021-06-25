import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FilterComponent} from '../components/filter/filter.component';
import {FooterComponent} from '../components/footer/footer.component';
import {HeaderComponent} from '../components/header/header.component';
import {ModalTemplateComponent} from '../components/modals/modal-template/modal-template.component';
import {SnackbarComponent} from '../components/snackbar/snackbar.component';


@NgModule({
  declarations: [
    FilterComponent,
    FooterComponent,
    HeaderComponent,
    ModalTemplateComponent,
    SnackbarComponent],
  imports: [
    CommonModule,
    RouterModule,

  ],exports:[
    FilterComponent,
    FooterComponent,
    HeaderComponent,
    ModalTemplateComponent,
    SnackbarComponent
  ]
})
export class SharedModule { }
