import { Component, OnInit } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { Router } from '@angular/router';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  constructor(
    public _ss: ShopService,
    public router: Router,
    public dialog: MatDialog
  ) {}

  public products: any = [];
  public categories: any = [];
  public id;
  public mySubscription: any;
  public user_numberid;
  public productName: any;

  ngOnInit() {
    this._ss.getAllCategories().subscribe(
      (res) => {
        this.categories = res;
        console.log(this.categories);
      },
      (err) => console.log(err)
    );
  }
  public getId(event) {
    this.id = event.target.id;
    this._ss.getProductsByCategory(this.id).subscribe(
      (res) => {
        console.log(res);
        this.products = res;
      },
      (err) => console.log(err)
    );
  }

  public addToCart(product) {
    console.log(product);
    let dialogRef = this.dialog.open(AddToCartComponent, {
      data: {
        name: product.productName,
        price: product.price,
        image: product.img_url,
        quantity: product.quantity,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.user_numberid = localStorage.getItem('user_numberId');
      console.log('dialog result:' + res);
      // if (res > 0) {
      this._ss
        .addProductToCart({
          quantity: res,
          price: product.price,
          product_id: product.id,
          cart_id: localStorage.getItem('cart_id'),
        })
        .subscribe(
          (res) => {
            console.log(res);

            this._ss.getProductsOfCart(this.user_numberid).subscribe((res) => {
              this.products = res;
            });
            // this.router.navigateByUrl('/allproducts');
            //check the update cart after
            this.router
              .navigateByUrl('', { skipLocationChange: true })
              .then(() => {
                this.router.navigate(['/allproducts']);
              });
          },
          (err) => console.log(err)
        );
      // }
      this.router.navigate(['/allproducts']);
    });
  }

  searchProduct(productName) {
    console.log('productName', this.productName);
    this._ss.search(productName).subscribe(
      (res) => {
        this.products = JSON.parse(res);

        // this.productName = res;
        console.log(res, this.productName);
      },
      (err) => console.log(err)
    );
  }
}
