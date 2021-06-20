import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { categoryInputMap } from 'src/app/models/interfaces/category.interface';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-create-edit',
  templateUrl: './category-create-edit.component.html',
  styleUrls: ['./category-create-edit.component.css']
})
export class CategoryCreateEditComponent implements OnInit {

  categoryForm: FormGroup;
  categoryData = [{
    "id": 5,
    "name": "casii5l5a9",
    "parentId": null
  }];

  categoryInput: categoryInputMap = {
    name: ''
  }
  constructor(private fb: FormBuilder, private _categoryService: CategoryService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.formBuilder();
  }


  formBuilder() {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      parentCategoryList: ['']
    });
  }

  onSubmit() {
    this.getInputForm();
    this._categoryService.addCategory(this.categoryInput).subscribe(res => {
      console.log(res);
      this._snackBar.openFromComponent(SnackbarComponent, { data: "Category created", duration: 3000 });

    },
      err => { console.log(err)
      })
  }

  getInputForm(){
    Object.keys(this.categoryForm.controls).forEach(key => {
      if( this.categoryForm.get(key).value !== ''){
        this.categoryInput[key] = this.categoryForm.get(key).value ;
      }
    })
  }


}
