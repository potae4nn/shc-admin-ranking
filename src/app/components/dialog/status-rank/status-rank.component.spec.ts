import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusRankComponent } from './status-rank.component';

describe('StatusRankComponent', () => {
  let component: StatusRankComponent;
  let fixture: ComponentFixture<StatusRankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusRankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
