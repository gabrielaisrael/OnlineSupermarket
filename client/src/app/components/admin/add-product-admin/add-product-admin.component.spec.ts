import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductAdminComponent } from './add-product-admin.component';

describe('AddProductAdminComponent', () => {
  let component: AddProductAdminComponent;
  let fixture: ComponentFixture<AddProductAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
