import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { PersonOutputMap } from 'src/app/models/interfaces/person.interface';
import { TokenService } from 'src/app/services/token.service';
import { DetailModalComponent } from './person-detail/detail-modal/detail-modal.component';
import { PersonService } from './services/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person-view.component.html',
  styleUrls: ['./person-view.component.css']
})
export class PersonViewComponent implements OnInit {


  constructor(private _personService: PersonService, private _snackBar: MatSnackBar, private _tokenService: TokenService,
    private modal: MatDialog
  ) { }

  personList: PersonOutputMap[] = [];
  selectedPersonId: any;



  ngOnInit(): void {
    this.getEntityList();
  }

  getEntityList() {
    this._personService.getPersonList().subscribe(res => {
      this.personList = res;
    }, err => {
      console.log(err);
      this._snackBar.openFromComponent(SnackbarComponent, { data: 'An error occurs', duration: 3000 });
    });
  }

  getSelectedItem(item) {
    this.selectedPersonId = item[0];
  }

  checkLoggin(): boolean {
    return this._tokenService.exist();
  }

  openModal() {
    const dialogRef = this.modal.open(DetailModalComponent, {
      width: '300px',
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


}
