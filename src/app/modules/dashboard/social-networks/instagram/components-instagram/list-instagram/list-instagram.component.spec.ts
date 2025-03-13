import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInstagramComponent } from './list-instagram.component';

describe('ListInstagramComponent', () => {
  let component: ListInstagramComponent;
  let fixture: ComponentFixture<ListInstagramComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListInstagramComponent]
    });
    fixture = TestBed.createComponent(ListInstagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
