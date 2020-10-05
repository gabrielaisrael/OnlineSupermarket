import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptErrorComponent } from './receipt-error.component';

describe('ReceiptErrorComponent', () => {
  let component: ReceiptErrorComponent;
  let fixture: ComponentFixture<ReceiptErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
