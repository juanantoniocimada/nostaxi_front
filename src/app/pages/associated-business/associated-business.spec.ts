import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatedBusiness } from './associated-business';

describe('AssociatedBusiness', () => {
  let component: AssociatedBusiness;
  let fixture: ComponentFixture<AssociatedBusiness>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociatedBusiness]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociatedBusiness);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
