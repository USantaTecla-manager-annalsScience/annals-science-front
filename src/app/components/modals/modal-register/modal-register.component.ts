import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LOGIN_FORM, passwordMatchValidator } from 'src/app/models/forms.constant';

@Component({
  selector: 'app-modal-register.',
  templateUrl: './modal-register.component.html',
  styleUrls: ['./modal-register.component.css']
})
export class ModalRegisterComponent implements OnInit {

  public modalForm: FormGroup = new FormGroup({});
  _Header: any[] = [];
  hide: boolean | undefined;
  title: string = '';



  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ModalRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.hide = true;
    this.title = this.data.title;
    this._Header = this.data.header;
    this.formBuilder();
    this.modalForm.get('email').setValidators(Validators.email);
  }

  formBuilder() {
    this.modalForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required],
      passwordRepeat: ['', [Validators.required]]
    }, { validator: passwordMatchValidator });
  }



  manageButtonsModal(text: string) {
    if (text === 'save') {
      this.onSubmit();
    } else {
      this.dialogRef.close();
    }
  }

  onSubmit() {
    this.dialogRef.close(this.modalForm);
  }

  onPasswordInput() {
    if (this.modalForm.hasError('passwordMismatch'))
      this.modalForm.get('passwordRepeat').setErrors([{ 'passwordMismatch': true }]);
    else
      this.modalForm.get('passwordRepeat').setErrors(null);
  }

  getInpuType(item: any) {
    return item.type;
  }


  getButtonStatus(): boolean {
    return this.modalForm.valid;
  }

  getErrorMessage() {
    return 'Debe introducir un valor'
  }

  getErrorEmailMessage() {

    return this.modalForm.get('email').hasError('email') ? 'Email no válido' : '';
  }

}
