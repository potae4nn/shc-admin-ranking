import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMemberComponent } from './table-member.component';

describe('TableMemberComponent', () => {
  let component: TableMemberComponent;
  let fixture: ComponentFixture<TableMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
