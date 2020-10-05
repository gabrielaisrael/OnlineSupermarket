import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProductsOrderComponent } from './search-products-order.component';

describe('SearchProductsOrderComponent', () => {
  let component: SearchProductsOrderComponent;
  let fixture: ComponentFixture<SearchProductsOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchProductsOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProductsOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
