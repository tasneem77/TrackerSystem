import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMileStoneComponent } from './edit-mile-stone.component';

describe('EditMileStoneComponent', () => {
  let component: EditMileStoneComponent;
  let fixture: ComponentFixture<EditMileStoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMileStoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMileStoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
