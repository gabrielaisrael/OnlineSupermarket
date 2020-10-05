import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../shop/services/shop.service';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-cart-order',
  templateUrl: './cart-order.component.html',
  styleUrls: ['./cart-order.component.css'],
})
export class CartOrderComponent implements OnInit {
  constructor(public _ss: ShopService, public _os: OrderService) {}

  public products: any = [];
  public user_numberid;
  public sum_price: number;
  public total;

  ngOnInit() {
    this.user_numberid = localStorage.getItem('user_numberId');
    this._ss.getProductsOfCart(this.user_numberid).subscribe(
      (res) => {
        this.products = res;
        console.log(this.products);
        this._os.receiptFile = res;
        this.total = localStorage.getItem('total');
        // this.total = this._os.totalPriceReceipt;
      },
      (err) => console.log(err)
    );
  }
  displayedColumns = ['img_url', 'productName', 'quantity', 'sum_price'];
}
