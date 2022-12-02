import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableStaffComponent } from './table-staff.component';

describe('TableStaffComponent', () => {
  let component: TableStaffComponent;
  let fixture: ComponentFixture<TableStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
