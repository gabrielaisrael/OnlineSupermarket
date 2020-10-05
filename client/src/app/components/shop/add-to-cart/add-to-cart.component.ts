import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ShopService } from '../services/shop.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {

  constructor(public _ss: ShopService, public router: Router,
     public _fb: FormBuilder,
    public dialogRef: MatDialogRef<AddToCartComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  public products: any = []
  public formAdd: FormGroup;
  public id
  public name
  public price
  public image
  public quantity

  ngOnInit(): void {

    this.name = this.data.name
    this.price = this.data.price
    this.image = this.data.image
    this.quantity = this.data.quantity

  }


  // public saveProdDetails() {
  //   console.log(this.quantity)
  //   localStorage.setItem('quantity', JSON.stringify(this.quantity))
  // }
  // this.formAdd = this._fb.group({
  //   product_id: 0,
  //   cart_id: 0,
  //   quantity: 0
  // });



  // this._ss.addToMyCart(this.formAdd.value).subscribe(
  //   res => { console.log(this.formAdd.value); console.log(res) },
  //   err => console.log(err)
  // )



}
  // addProductToCart(){
  //   this._ss.addToMyCart(this.product)
  // }

  // public addProductToCart(product) {
  //   this.dialogRef.close(CartComponent,
  //     {data:{
  //       name: product.productName
  //     }})
  // }


