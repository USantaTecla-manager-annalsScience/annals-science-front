import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PersonDetailModalComponent } from 'src/app/pages/person/modals/person-detail-modal/detail-modal.component';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { Person } from 'src/app/models/interfaces/person.interface';
import { TokenService } from 'src/app/services/token.service';
import { PersonService } from './services/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person-view.component.html',
  styleUrls: ['./person-view.component.css']
})
export class PersonViewComponent implements OnInit {

  messageError = 'An error occurs';
  personList: Person[] = [];
  selectedPersonId: any;

  constructor(private _personService: PersonService, private _snackBar: MatSnackBar, private _tokenService: TokenService,
    private modal: MatDialog, private router: Router
  ) { }


  ngOnInit(): void {
    this._personService.clearPerson();
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

  async openModal() {
    const currentPerson = await this.getSelectedPerson();
    const dialogRef = this.modal.open(PersonDetailModalComponent, {
      width: '600px',
      data: currentPerson
      
    });

    dialogRef.afterClosed().subscribe((personId) => {
      if(personId){
        this.router.navigate(['/person-edit', personId ]);
        this._personService.setPerson(currentPerson);
      }

      this.selectedPersonId = null;
    });
  }

  getSelectedPerson() { 
    return this._personService.getPersonById(this.selectedPersonId).toPromise();
  }

  onDeletePerson(personId){
    this._personService.deletePersonById(personId).subscribe(res =>{
      this._snackBar.openFromComponent(SnackbarComponent, { data: 'Person deleted', duration: 3000 });
      this.getPersonList();

    },err => {
      console.log(err);
      this._snackBar.openFromComponent(SnackbarComponent, { data: 'An error occurs', duration: 3000 });
    });
  }


}
