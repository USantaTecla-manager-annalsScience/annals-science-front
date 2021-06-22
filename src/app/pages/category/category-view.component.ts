import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { categoryOutpuMap } from 'src/app/models/interfaces/category.interface';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent implements OnInit {

  constructor(private _categoryService: CategoryService,
              private _snackBar: MatSnackBar) { }

  categoryData: categoryOutpuMap [] = [];

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(data => {
      this.categoryData = data;
    },err =>{
      this._snackBar.openFromComponent(SnackbarComponent, { data: 'An error occurs', duration: 3000 });
    })
  }

}
