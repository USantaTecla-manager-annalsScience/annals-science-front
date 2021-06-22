import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { categoryOutpuMap } from 'src/app/models/interfaces/category.interface';
import { Person, PersonInputMap } from 'src/app/models/interfaces/person.interface';
import { CategoryService } from '../../category/services/category.service';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-person-create-edit',
  templateUrl: './person-create-edit.component.html',
  styleUrls: ['./person-create-edit.component.css']
})
export class PersonCreateEditComponent implements OnInit {

  constructor(private fb: FormBuilder, private _categoryService: CategoryService, private _personService: PersonService,
    private _snackBar: MatSnackBar) { }

  personForm: FormGroup;
  categoryData: categoryOutpuMap [] = [];
  selectedItem = new Set();
  personInput: any = {
    name: '',
    surname: '',
    birthDate: '',
    deathDate: '',
    description: '',
    imageUrl: '',
    wikiUrl: '',
    categoriesId: [],
  };
  messageError = 'An error occurs';

  ngOnInit(): void {
    this.formBuilder();
    this.getCategories();
  }

  formBuilder(){
    this.personForm = this.fb.group({
      name: ['', Validators.required],
      surname: [''],
      birthDate: [''],
      deathDate: [''],
      description: [''],
      imageUrl: [''],
      wikiUrl: [''],
      categoriesId: [{}],
    });
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(data => {
      this.categoryData = data;
    },err =>{
      console.log(err);
      this._snackBar.openFromComponent(SnackbarComponent, { data: 'An error occurs', duration: 3000 });

    })
  }

  onSubmit(){
    this.createPerson();
  }

  createPerson(){
    this.getInputForm();
    this._personService.addPerson(this.personInput).subscribe(data =>{
      this._snackBar.openFromComponent(SnackbarComponent, { data: "Person created", duration: 3000 });

    },err => {
     if(err.status === 401){
       this.messageError = "You don't have permission for this operation"
     }
     this._snackBar.openFromComponent(SnackbarComponent, { data: this.messageError, duration: 3000 });
     console.log(err);
    })
  }

  getInputForm() {
    Object.keys(this.personForm.controls).forEach(key => {
      if (this.personForm.get(key).value !== '') {
        this.personInput[key] = this.personForm.get(key)?.value;
      }
    })
    this.personInput['categoriesId'] = this.selectedItem ? this.selectedItem : '';
  }

  onClickDelete(item){
    this.selectedItem.delete(item);
    
  }

  getSelectedItem(item: any){
    this.selectedItem.add(item[0]);
  }

}
