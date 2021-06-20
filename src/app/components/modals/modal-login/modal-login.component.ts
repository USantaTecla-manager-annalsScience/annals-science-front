import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {

  public modalForm: FormGroup = new FormGroup({});
  _Header: any[] = [];
  title: string = '';
  hide = true;



  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ModalLoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this._Header = this.data.header;
    this.formBuilder();
    this.modalForm.get('email').setValidators(Validators.email);
  }

  formBuilder() {
    this.modalForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required]
    });
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

  getInputTye(item: any){
    return item.type;
  }

  getButtonStatus(): boolean{
    return this.modalForm.valid;
  }

  
  getErrorMessage() {
    return 'Debe introducir un valor'
  }

  getErrorEmailMessage(){
    return this.modalForm.get('email').hasError('email') ? 'Email no válido' : '';
  }

}
