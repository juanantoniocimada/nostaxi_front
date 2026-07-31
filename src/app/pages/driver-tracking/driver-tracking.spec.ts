import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverTracking } from './driver-tracking';

describe('DriverTracking', () => {
  let component: DriverTracking;
  let fixture: ComponentFixture<DriverTracking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverTracking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverTracking);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
