import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestdetailCalendarComponent } from './requestdetail-calendar.component';

describe('RequestdetailCalendarComponent', () => {
  let component: RequestdetailCalendarComponent;
  let fixture: ComponentFixture<RequestdetailCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestdetailCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestdetailCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
