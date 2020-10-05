import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShopService } from './services/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  showFiller = false;
  constructor(public router:Router, public _ss:ShopService) { }

  ngOnInit() {
    const token=localStorage.getItem('token')
    if (token != undefined) {
      console.log('token', token)
     this._ss.isLogin = true
  }else{
    this.router.navigate([''])
  }

}}
