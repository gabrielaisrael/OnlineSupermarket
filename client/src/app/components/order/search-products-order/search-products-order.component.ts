import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-search-products-order',
  templateUrl: './search-products-order.component.html',
  styleUrls: ['./search-products-order.component.css'],
})
export class SearchProductsOrderComponent implements OnInit {
  constructor(public _os: OrderService) {}

  ngOnInit(): void {}

  public searchCart(product) {
    if (product.includes(this._os.name)) {
      this._os.isExist = true;
    }
  }
}
