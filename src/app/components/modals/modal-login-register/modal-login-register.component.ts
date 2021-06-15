import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HEADER_LOGIN } from 'src/app/pages/home/models/home-data-view';

@Component({
  selector: 'app-modal-login-register',
  templateUrl: './modal-login-register.component.html',
  styleUrls: ['./modal-login-register.component.css']
})
export class ModalLoginRegisterComponent implements OnInit {

  public modalForm: FormGroup = new FormGroup({});
  _Header: any[] = [];
  

  constructor(private fb: FormBuilder,  public dialogRef: MatDialogRef<ModalLoginRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data);
    this.modalForm = this.fb.group(this.data.modalFormConf);
    this._Header = this.data.header;
  }

  manageButtonsModal(text: string){
    if(text === 'save'){
      this.onSubmit();
    }else{
      this.dialogRef.close();
    }
  }

  onSubmit(){
    this.dialogRef.close(this.modalForm);
  }

}
