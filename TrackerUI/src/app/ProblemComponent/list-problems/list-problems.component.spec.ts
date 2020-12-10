import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProblemsComponent } from './list-problems.component';

describe('ListProblemsComponent', () => {
  let component: ListProblemsComponent;
  let fixture: ComponentFixture<ListProblemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProblemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProblemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
