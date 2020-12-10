import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMilestonesComponent } from './list-milestones.component';

describe('ListMilestonesComponent', () => {
  let component: ListMilestonesComponent;
  let fixture: ComponentFixture<ListMilestonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMilestonesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMilestonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
