import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBidsComponent } from './view-bids.component';

describe('ViewBidsComponent', () => {
  let component: ViewBidsComponent;
  let fixture: ComponentFixture<ViewBidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewBidsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
