import { Component, OnInit } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(public _ss: ShopService, public router: Router) {}

  public products: any = [];
  public user_numberid;
  public sum_price: number;
  public total;

  ngOnInit() {
    this.user_numberid = localStorage.getItem('user_numberId');
    this._ss.checkCartExists(this.user_numberid).subscribe((result: any) => {
      console.log(result, typeof result);
      console.log(result[0].dateCreated);
      this._ss.isLogin = true;
      console.log(result.length);

      if (result.length > 0) {
        this._ss.dateCreated = result[0].dateCreated;
        this._ss.hasCart = true;
        localStorage.setItem('hasCart', JSON.stringify(this._ss.hasCart));
        localStorage.setItem(
          'dateCreated',
          JSON.stringify(this._ss.dateCreated)
        );
      } else {
        this._ss.hasCart = false;
        localStorage.setItem('hasCart', JSON.stringify(this._ss.hasCart));
      }
      console.log(this._ss.hasCart);
    });

    this._ss.getProductsOfCart(this.user_numberid).subscribe(
      (res) => {
        this.products = res;
        console.log(this.products);
        this.getTotalPrice();
        console.log(this.getTotalPrice(), this.total);
      },
      (err) => console.log(err)
    );
  }

  public deleteProduct(prodId, cartId) {
    console.log(prodId, cartId);
    this._ss.deleteProduct(prodId, cartId).subscribe(
      (res) => {
        console.log(res);
        this._ss.getProductsOfCart(this.user_numberid).subscribe((res) => {
          this.products = res;
          this.getTotalPrice();

          console.log(this.getTotalPrice());
        });
      },
      (err) => console.log(err)
    );
  }

  public btnDeleteAllProducts(cartId) {
    console.log(cartId);
    this._ss.deleteAllProducts(cartId).subscribe(
      (res) => {
        console.log(res);
        this._ss.getProductsOfCart(this.user_numberid).subscribe((res) => {
          this.products = res;
          this.getTotalPrice();
          console.log(this.getTotalPrice());
        });
      },
      (err) => console.log(err)
    );
  }

  public getTotalPrice(): any {
    this.total = 0;
    for (let i = 0; i < this.products.length; i++) {
      this.total += this.products[i].sum_price;
      console.log(this.total);
    }
    // let roundedString = sum.toFixed(2)
  }

  toOrder() {
    this.router.navigate(['/order']);
    localStorage.setItem('total', this.total);
  }

  displayedColumns = [
    'img_url',
    'productName',
    'quantity',
    'sum_price',
    'actions',
  ];
  // dataSource = new MatTableDataSource(this.products);
}
