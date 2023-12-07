import { TestBed } from '@angular/core/testing';

import { SelectproductService } from './selectproduct.service';

describe('SelectproductService', () => {
  let service: SelectproductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectproductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
