import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { CategoryOutpuMap } from 'src/app/models/interfaces/category.interface';
import { TokenService } from 'src/app/services/token.service';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent implements OnInit {

  constructor(private _categoryService: CategoryService,
              private _tokenService: TokenService,
              private _snackBar: MatSnackBar,
              private _router: Router) { }

  categoryData: CategoryOutpuMap [] = [];
  selectedCategory: CategoryOutpuMap;

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

  setSelectedCategory(category: CategoryOutpuMap) {
    this.selectedCategory = category;
  }

  isLogged(): boolean {
    return this._tokenService.exist();
  }

  delete(id: number) {
    this._categoryService.deleteCategory(id).subscribe(res => {
      this.selectedCategory = null;
      this.getCategories();
    })
  }

  create() {
    this._router.navigateByUrl('/create-cat');
  }

}
