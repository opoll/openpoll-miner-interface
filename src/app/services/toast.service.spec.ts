import { TestBed, inject } from '@angular/core/testing';

import { ToastserviceService } from './toast.service';

describe('ToastserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastserviceService]
    });
  });

  it('should be created', inject([ToastserviceService], (service: ToastserviceService) => {
    expect(service).toBeTruthy();
  }));
});
