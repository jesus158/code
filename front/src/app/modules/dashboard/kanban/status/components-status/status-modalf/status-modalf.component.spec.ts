import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusModalfComponent } from './status-modalf.component';

describe('StatusModalfComponent', () => {
  let component: StatusModalfComponent;
  let fixture: ComponentFixture<StatusModalfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusModalfComponent]
    });
    fixture = TestBed.createComponent(StatusModalfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
