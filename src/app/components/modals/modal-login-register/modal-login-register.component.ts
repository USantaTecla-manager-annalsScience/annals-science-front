import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LOGIN_FORM, passwordMatchValidator } from 'src/app/models/forms.constant';
import { HEADER_LOGIN } from 'src/app/pages/home/models/home-data-view';

@Component({
  selector: 'app-modal-login-register',
  templateUrl: './modal-login-register.component.html',
  styleUrls: ['./modal-login-register.component.css']
})
export class ModalLoginRegisterComponent implements OnInit {

  public modalForm: FormGroup = new FormGroup({});
  _Header: any[] = [];
  hide: boolean | undefined;
  title: string = '';
  


  constructor(private fb: FormBuilder,  public dialogRef: MatDialogRef<ModalLoginRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.hide = true;
    this.title = this.data.title;
    this._Header = this.data.header;
    this.formBuilder();
  }

  formBuilder(){
    if(this.title === 'Registro'){
      this.modalForm = this.fb.group({
        name: ['', Validators.required],
          surname: ['', Validators.required],
          email: ['', [Validators.required]],
          password: ['',Validators.required],
          passwordRepeat: ['', [Validators.required]]
      },{validator: passwordMatchValidator});
    }else{
      this.modalForm = this.fb.group(LOGIN_FORM.CONF);
    }
  }


  manageButtonsModal(text: string){
    if(text === 'save' && this.modalForm.valid){
      this.onSubmit();
    }else{
      this.dialogRef.close('close');
    }
  }

  onSubmit(){
    this.dialogRef.close(this.modalForm);
  }

  onPasswordInput() {
    if (this.modalForm.hasError('passwordMismatch'))
      this.modalForm.get('passwordRepeat').setErrors([{'passwordMismatch': true}]);
    else
    this.modalForm.get('passwordRepeat').setErrors(null);
  }

}
