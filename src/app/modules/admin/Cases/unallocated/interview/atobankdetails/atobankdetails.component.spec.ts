import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtobankdetailsComponent } from './atobankdetails.component';

describe('AtobankdetailsComponent', () => {
  let component: AtobankdetailsComponent;
  let fixture: ComponentFixture<AtobankdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtobankdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtobankdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
