import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWhatsappComponent } from './list-whatsapp.component';

describe('ListWhatsappComponent', () => {
  let component: ListWhatsappComponent;
  let fixture: ComponentFixture<ListWhatsappComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListWhatsappComponent]
    });
    fixture = TestBed.createComponent(ListWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
