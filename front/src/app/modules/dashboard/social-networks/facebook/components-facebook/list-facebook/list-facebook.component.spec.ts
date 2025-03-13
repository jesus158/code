import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFacebookComponent } from './list-facebook.component';

describe('ListFacebookComponent', () => {
  let component: ListFacebookComponent;
  let fixture: ComponentFixture<ListFacebookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListFacebookComponent]
    });
    fixture = TestBed.createComponent(ListFacebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
