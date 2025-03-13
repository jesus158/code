import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingLeadsComponent } from './incoming-leads.component';

describe('IncomingLeadsComponent', () => {
  let component: IncomingLeadsComponent;
  let fixture: ComponentFixture<IncomingLeadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncomingLeadsComponent]
    });
    fixture = TestBed.createComponent(IncomingLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
