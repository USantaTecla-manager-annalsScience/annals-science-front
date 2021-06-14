import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { HomeViewComponent } from './home.component';



@NgModule({
  declarations: [
    HeaderComponent,
    HomeViewComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
