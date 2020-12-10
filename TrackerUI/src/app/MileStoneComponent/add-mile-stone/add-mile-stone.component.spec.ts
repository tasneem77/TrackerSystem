import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMileStoneComponent } from './add-mile-stone.component';

describe('AddMileStoneComponent', () => {
  let component: AddMileStoneComponent;
  let fixture: ComponentFixture<AddMileStoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMileStoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMileStoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
