import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop/services/shop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  showFiller = false;
  constructor(public router:Router, public _ss:ShopService) { }

  ngOnInit(): void {
    const token=localStorage.getItem('token')
    if (token != undefined) {
      console.log('token', token)
     this._ss.isLogin = true
  }else{
    this.router.navigate([''])
  }
  }

}
