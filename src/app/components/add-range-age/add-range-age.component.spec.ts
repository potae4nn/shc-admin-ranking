import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRangeAgeComponent } from './add-range-age.component';

describe('AddRangeAgeComponent', () => {
  let component: AddRangeAgeComponent;
  let fixture: ComponentFixture<AddRangeAgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRangeAgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRangeAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
