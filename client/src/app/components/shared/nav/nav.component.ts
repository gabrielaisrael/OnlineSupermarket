import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../home/service/login.service';
import { ShopService } from '../../shop/services/shop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(public _ss: ShopService, public router: Router) {}

  public isLogin;
  public firstname;
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token != undefined) {
      console.log('token', token);
      this._ss.isLogin = true;
    } else {
      this._ss.isLogin = false;
    }
    this._ss.firstname = JSON.parse(localStorage.getItem('firstname'));
  }

  logout() {
    localStorage.clear();
    location.reload();
  }
}
