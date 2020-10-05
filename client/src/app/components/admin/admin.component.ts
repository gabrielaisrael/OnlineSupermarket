import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop/services/shop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  showFiller = false;
  public isAdmin;
  constructor() {}

  ngOnInit(): void {}
}
