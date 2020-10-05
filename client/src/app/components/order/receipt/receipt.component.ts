import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ShopService } from '../../shop/services/shop.service';
import { OrderService } from '../service/order.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css'],
})
export class ReceiptComponent implements OnInit {
  public user_numberId;
  public firstname = localStorage.getItem('firstname');
  public total;
  public orders;
  public orderDate;
  MainUrl;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public router: Router,
    public _ss: ShopService,
    public _os: OrderService,
    public http: HttpClient
  ) {
    this.MainUrl = environment.MainUrl;
  }
  public receiptOrder =
    '\r\n' + '  ' + this.firstname + "'s " + 'Receipt:' + '\r\n';
  ngOnInit() {
    this.total = localStorage.getItem('total');
    this._os.receiptFile.forEach((product) => {
      this.receiptOrder += '\r\n' + '\r\n';
      this.receiptOrder += 'Product: ' + product.productName + '   ';
      this.receiptOrder += 'Quantity: ' + product.quantity + '    ';
      this.receiptOrder += 'Price: ' + product.price + ' ₪ ' + '    ';
      this.receiptOrder += 'Sum: ' + product.sum_price;
    });
    this.receiptOrder += '\r\n';
    this.receiptOrder += '\r\n';
    this.receiptOrder += 'Total: ' + this.total + ' ₪ ' + '   ';
  }

  okBtn() {
    this.user_numberId = JSON.parse(localStorage.getItem('user_numberId'));
    this._ss.getOrderOfUser(this.user_numberId).subscribe(
      (res) => {
        this.orders = res;
        console.log(this.orders);
        if (this.orders.length > 0) {
          this._ss.orderDate = res[0].orderDate;
          this._ss.submittedOrder = true;
          localStorage.setItem(
            'submittedOrder',
            JSON.stringify(this._ss.submittedOrder)
          );
          this._ss.totalPrice = res[0].totalPrice;
          localStorage.setItem('orderDate', JSON.stringify(this._ss.orderDate));
          console.log(JSON.parse(localStorage.getItem('orderDate')));
          localStorage.setItem(
            'totalPrice',
            JSON.stringify(this._ss.totalPrice)
          );
          console.log(this._ss.totalPrice);
        } else {
          this._ss.submittedOrder = false;
          localStorage.setItem(
            'submittedOrder',
            JSON.stringify(this._ss.submittedOrder)
          );
        }
        console.log(this._ss.submittedOrder);
      },
      (err) => console.log(err)
    );
    this._ss.checkCartExists(this.user_numberId).subscribe((result: any) => {
      this._ss.isLogin = true;
      console.log(result.length);

      if (result.length > 0) {
        this._ss.hasCart = true;
        localStorage.setItem('hasCart', JSON.stringify(this._ss.hasCart));
      } else {
        this._ss.hasCart = false;
        localStorage.setItem('hasCart', JSON.stringify(this._ss.hasCart));
      }
      localStorage.removeItem('cart_id');
      this.router.navigate(['']);
    });
  }

  getReceipt() {
    this._os.createReceipt({ content: this.receiptOrder.toString() }).subscribe(
      (res) => {
        console.log(res);
        console.log({ content: this.receiptOrder.toString() });
        this.downloadPdf();
        window.open(this.MainUrl + 'order/download/receipt', '_blank');
        this.user_numberId = JSON.parse(localStorage.getItem('user_numberId'));
      },
      (err) => console.log(err)
    );
    this.user_numberId = JSON.parse(localStorage.getItem('user_numberId'));
    this._ss.getOrderOfUser(this.user_numberId).subscribe(
      (res) => {
        this.orders = res;
        console.log(this.orders);
        if (this.orders.length > 0) {
          this._ss.orderDate = res[0].orderDate;
          this._ss.submittedOrder = true;
          localStorage.setItem(
            'submittedOrder',
            JSON.stringify(this._ss.submittedOrder)
          );
          this._ss.totalPrice = res[0].totalPrice;
          localStorage.setItem('orderDate', JSON.stringify(this._ss.orderDate));
          console.log(JSON.parse(localStorage.getItem('orderDate')));
          localStorage.setItem(
            'totalPrice',
            JSON.stringify(this._ss.totalPrice)
          );
          console.log(this._ss.totalPrice);
        } else {
          this._ss.submittedOrder = false;
          localStorage.setItem(
            'submittedOrder',
            JSON.stringify(this._ss.submittedOrder)
          );
        }
        console.log(this._ss.submittedOrder);
      },
      (err) => console.log(err)
    );
  }

  downloadPdf() {
    this._os.downloadReceipt().subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
