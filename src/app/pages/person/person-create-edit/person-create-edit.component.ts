import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { Category } from 'src/app/models/interfaces/category.interface';
import { Person } from 'src/app/models/interfaces/person.interface';
import { CategoryService } from '../../category/services/category.service';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-person-create-edit',
  templateUrl: './person-create-edit.component.html',
  styleUrls: ['./person-create-edit.component.css']
})
export class PersonCreateEditComponent implements OnInit {

  personForm: FormGroup;
  categoryData: Category[] = [];
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
  person: Person = {
    id: null,
    name:'',
    surname: '',
    birthDate:'',
    deathDate:'',
    description:'',
    imageUrl:'',
    wikiUrl:'',
    categories: []
  }
  messageError = 'An error occurs';
  personId: any;
  title = 'Crear Persona';

  constructor(private fb: FormBuilder, private _categoryService: CategoryService, private _personService: PersonService,
    private _snackBar: MatSnackBar, private _route: ActivatedRoute,  private router: Router) { }



  ngOnInit(): void {
    this.formBuilder();
    this.getInitialData();
    if (this.personId) {
      this.title = 'Modificar Persona'
      this.getPersonById();

    }
  }

  formBuilder() {
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

  getInitialData() {
    this.getCategories();
    this.getEntryId();
  }

  getEntryId() {
    this.personId = this._route.snapshot.paramMap.get('id') ?? null;
  }

  getCategories() {
    this._categoryService.getCategories().subscribe(data => {
      this.categoryData = data;
    }, err => {
      console.log(err);
      this._snackBar.openFromComponent(SnackbarComponent, { data: 'An error occurs', duration: 3000 });

    })
  }


  getPersonById() {
    this._personService.getPersonById(this.personId).subscribe(res => {
      this.person = res;
      this.setInitialForm();
    }, err => {
      console.log(err);
    });
  }

  setInitialForm(){
    let cat = new Set();
    Object.keys(this.personForm.controls).forEach(key => {
      this.personForm.get(key).setValue(this.person[key] ?? '');
    });
    const categories: Category [] = this.person['categories'];
    for(let category of categories){
      cat.add(category);
    }
    this.selectedItem = cat;  
    this.personForm.updateValueAndValidity();

  }

  onSubmit() {
      this.getInputForm();
      (this.personId) ? this.updatePerson() : this.createPerson();
  }

  
  createPerson(){
    this._personService.addPerson(this.personInput).subscribe(data => {
      this._snackBar.openFromComponent(SnackbarComponent, { data: "Person created", duration: 3000 });
      this.router.navigate(['/person']);



    }, err => {
      if (err.status === 401) {
        this.messageError = "You don't have permission for this operation"
      }
      this._snackBar.openFromComponent(SnackbarComponent, { data: this.messageError, duration: 3000 });
      console.log(err);
    })
  }

  updatePerson(){
    this._personService.updatePerson(this.personInput,this.personId).subscribe(res => {
      this._snackBar.openFromComponent(SnackbarComponent, { data: "Person updated", duration: 3000 });
      setTimeout(()=>{
        this.router.navigate(['/person']);
      },3000);
    }, err => {
     
      this._snackBar.openFromComponent(SnackbarComponent, { data: "An error occurs", duration: 3000 });
      console.log(err);
    });
  }

  getInputForm() {
    Object.keys(this.personForm.controls).forEach(key => {
      if (this.personForm.get(key).value !== '') {
        this.personInput[key] = this.personForm.get(key)?.value;
      }
    })
    this.personInput['categoriesId'] = this.selectedItem ? this.selectedItem : '';
  }

  onClickDelete(item) {
    this.selectedItem.delete(item);
  }

  getSelectedItem(item: any) {
    this.selectedItem.add(item[0]);
  }

}
