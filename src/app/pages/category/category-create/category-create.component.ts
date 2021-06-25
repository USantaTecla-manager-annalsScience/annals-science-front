import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { CategoryInputMap as CategoryInputMap, Category as Category } from 'src/app/models/interfaces/category.interface';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  categoryForm: FormGroup;
  categoryData: Category[] = [];
  messageError = 'An error occurs';

  categoryInput: CategoryInputMap = {
    name: ''
  }
  constructor(private fb: FormBuilder, private _categoryService: CategoryService, private _snackBar: MatSnackBar, private _router: Router) { }

  ngOnInit(): void {
    this.formBuilder();
    this.getCategories();
  }


  formBuilder() {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      parentId: ['']
    });
  }

  onSubmit() {
    this.getInputForm();
    this._categoryService.addCategory(this.categoryInput).subscribe(res => {
      this._snackBar.openFromComponent(SnackbarComponent, { data: "Category created", duration: 3000 });
      this.getCategories();
      this.redirectCategory();
    },
      err => {
        console.log(err)
        if (err.status === 401) {
          this.messageError = "You don't have permission for this operation";
        }
        this._snackBar.openFromComponent(SnackbarComponent, { data: this.messageError, duration: 3000 });
      })
  }

  getInputForm() {
    Object.keys(this.categoryForm.controls).forEach(key => {
      if (this.categoryForm.get(key).value !== '') {
        this.categoryInput[key] = this.categoryForm.get(key).value;
      }
    })
  }

  getCategories() {
    this._categoryService.getCategories().subscribe(data => {
      this.categoryData = data;
    })
  }

  redirectCategory(){
    setTimeout(()=>{
      this._router.navigate(['/cat']);
    },3000);
  }
}
