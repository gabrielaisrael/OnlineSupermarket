import { Component, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list-admin',
  templateUrl: './product-list-admin.component.html',
  styleUrls: ['./product-list-admin.component.css']
})
export class ProductListAdminComponent implements OnInit {
  public products: any = []
  public categories: any = []
  public id
  constructor(public _as: AdminService, public router: Router, public route: ActivatedRoute) { }

  ngOnInit(): void {

    this._as.getAllCategories().subscribe(
      res => {
        this.categories = res;
        console.log(this.categories)
      },
      err => console.log(err)
    )
  }
  public getId(event) {
    this.id = event.target.id
    this._as.getProductsByCategory(this.id).subscribe(

      res => {
        console.log(res)
        this.products = res


      },
      err => console.log(err)
    )
  }
  

  public onSelect(product) {
    this._as.productVal = product;
    console.log(this._as.productVal)
  }

}



