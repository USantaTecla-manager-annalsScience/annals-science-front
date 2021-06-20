import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityCreateEditComponent } from './entity-create-edit.component';

describe('EntityCreateEditComponent', () => {
  let component: EntityCreateEditComponent;
  let fixture: ComponentFixture<EntityCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntityCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
