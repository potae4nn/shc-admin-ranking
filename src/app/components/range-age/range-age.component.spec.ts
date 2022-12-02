import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeAgeComponent } from './range-age.component';

describe('RangeAgeComponent', () => {
  let component: RangeAgeComponent;
  let fixture: ComponentFixture<RangeAgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RangeAgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
