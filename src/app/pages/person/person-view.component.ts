import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { PersonOutputMap } from 'src/app/models/interfaces/person.interface';
import { TokenService } from 'src/app/services/token.service';
import { DetailModalComponent } from '../../components/modals/detail-modal/detail-modal.component';
import { PersonService } from './services/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person-view.component.html',
  styleUrls: ['./person-view.component.css']
})
export class PersonViewComponent implements OnInit {

  messageError = 'An error occurs';
  personList: PersonOutputMap[] = [];
  selectedPersonId: any;

  constructor(private _personService: PersonService, private _snackBar: MatSnackBar, private _tokenService: TokenService,
    private modal: MatDialog
  ) { }


  ngOnInit(): void {
    this.getPersonList();
  }

  getPersonList() {
    this._personService.getPersonList().subscribe(res => {
      this.personList = res;
    }, err => {
      console.log(err)
        if (err.status === 401) {
          this.messageError = "You don't have permission for this operation";
        }
        this._snackBar.openFromComponent(SnackbarComponent, { data: this.messageError, duration: 3000 });
    });
  }

  getSelectedItem(item) {
    this.selectedPersonId = item;
  }

  checkLoggin(): boolean {
    return this._tokenService.exist();
  }

  openModal() {
    const dialogRef = this.modal.open(DetailModalComponent, {
      width: '600px',
      data: {
        person: this.getSelectedPerson()
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.selectedPersonId = null;
    });
  }

  getSelectedPerson(): any {
    return this.personList.filter(item => item.id == this.selectedPersonId);
  }

  onDeletePerson(personId){
    console.log(personId);
    this._personService.deletePersonById(personId).subscribe(res =>{
      this._snackBar.openFromComponent(SnackbarComponent, { data: 'Person deleted', duration: 3000 });
      this.getPersonList();

    },err => {
      console.log(err);
      this._snackBar.openFromComponent(SnackbarComponent, { data: 'An error occurs', duration: 3000 });
    });
  }


}
