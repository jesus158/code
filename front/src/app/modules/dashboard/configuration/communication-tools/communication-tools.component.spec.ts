import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationToolsComponent } from './communication-tools.component';

describe('CommunicationToolsComponent', () => {
  let component: CommunicationToolsComponent;
  let fixture: ComponentFixture<CommunicationToolsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommunicationToolsComponent]
    });
    fixture = TestBed.createComponent(CommunicationToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
