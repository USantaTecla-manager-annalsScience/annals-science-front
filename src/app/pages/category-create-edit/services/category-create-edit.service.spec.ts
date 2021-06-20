import { TestBed } from '@angular/core/testing';

import { CategoryCreateEditService } from './category-create-edit.service';

describe('CategoryCreateEditService', () => {
  let service: CategoryCreateEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryCreateEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
