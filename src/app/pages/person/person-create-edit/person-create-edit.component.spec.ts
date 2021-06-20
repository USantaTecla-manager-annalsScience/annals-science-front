import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonCreateEditComponent } from './person-create-edit.component';

describe('PersonCreateEditComponent', () => {
  let component: PersonCreateEditComponent;
  let fixture: ComponentFixture<PersonCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
