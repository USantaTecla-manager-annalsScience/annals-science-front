import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { HomeViewComponent } from './home.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeViewComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
