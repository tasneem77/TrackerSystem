import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrequestdetailsComponent } from './addrequestdetails.component';

describe('AddrequestdetailsComponent', () => {
  let component: AddrequestdetailsComponent;
  let fixture: ComponentFixture<AddrequestdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddrequestdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrequestdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
