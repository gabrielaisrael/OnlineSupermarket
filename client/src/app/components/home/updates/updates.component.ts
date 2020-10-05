import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../shop/services/shop.service';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.css'],
})
export class UpdatesComponent implements OnInit {
  constructor(public _ss: ShopService) {}

  public sumProducts;
  public sumOrders;
  public dateCreated;
  public orderDate;
  public firstname;
  public submittedOrder;

  ngOnInit() {
    this._ss.getSumProducts().subscribe(
      (res) => {
        this.sumProducts = res;
        console.log(this.sumProducts);
      },
      (err) => console.log(err)
    );
    this._ss.getSumOrders().subscribe(
      (res) => {
        this.sumOrders = res;
        console.log(this.sumOrders);
      },
      (err) => console.log(err)
    );
    const token = localStorage.getItem('token');
    if (token != undefined) {
      console.log('token', token);
      this._ss.isLogin = true;
    } else {
      this._ss.isLogin = false;
    }
    this._ss.orderDate = JSON.parse(localStorage.getItem('orderDate'));
    this._ss.dateCreated = JSON.parse(localStorage.getItem('dateCreated'));
    this._ss.hasCart = JSON.parse(localStorage.getItem('hasCart'));
    this._ss.firstname = JSON.parse(localStorage.getItem('firstname'));
    this._ss.submittedOrder = JSON.parse(
      localStorage.getItem('submittedOrder')
    );
  }
}
