import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { Category, CategoryResponse } from 'src/app/models/interfaces/category.interface';
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

  messageError = 'An error occurs';
  categoryList: Category[] = [];
  selectedCategoryId: any;
  relatedCategories: any[];
  selectedCategory: Category;
  parentCategory: CategoryResponse;
  childrenCategory: CategoryResponse[];

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this._categoryService.getCategories().subscribe(data => {
      this.categoryList = data;
    }, err => {
      this._snackBar.openFromComponent(SnackbarComponent, { data: 'An error occurs', duration: 3000 });
    })
  }

  getSelectedItem(item: any) {
    this.selectedCategoryId = item;
    this.selectedCategory = this.categoryList.find(cat => cat.id == item);
    this.getParentCategory();
    this.getChildrenCategory();
  }

  getParentCategory() {
    this.parentCategory = this.selectedCategory.parent ?? null;
  }

  getChildrenCategory() {
    this.childrenCategory = (this.selectedCategory.children.length !== 0) ? this.selectedCategory.children : null;
  }

  checkLoggin(): boolean {
    return this._tokenService.exist();
  }

  delete(id: number) {
    this._categoryService.deleteCategory(id).subscribe(res => {
      this.getCategories();
      this._snackBar.openFromComponent(SnackbarComponent, { data: 'Category deleted', duration: 3000 });
    }, err => {
      console.log(err);
      this._snackBar.openFromComponent(SnackbarComponent, { data: 'An error occurs', duration: 3000 });

    })
  }

  create() {
    this._router.navigateByUrl('/cat-create');
  }

}
