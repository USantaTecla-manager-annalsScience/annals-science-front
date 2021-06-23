import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeViewComponent } from './home.component';


@NgModule({
  declarations: [
    HomeViewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    
  ],
  providers:[]
})
export class HomeModule { }
