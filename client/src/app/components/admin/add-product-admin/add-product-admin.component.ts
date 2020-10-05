import { Component, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-product-admin',
  templateUrl: './add-product-admin.component.html',
  styleUrls: ['./add-product-admin.component.css']
})
export class AddProductAdminComponent implements OnInit {

  constructor(public _fb: FormBuilder, public _as: AdminService) { }
  public categories
  public formAdd: FormGroup;
  ngOnInit() {
    this.formAdd = this._fb.group({
      productName: "",
      price: 0,
      img_url:"",
      category_id:0 
    });

    this._as.getAllCategories().subscribe(
      res => { this.categories = res },
      err => console.log(err)
    )
  }

  public submit() {
    this._as.addProduct(this.formAdd.value).subscribe(
      res => {
        console.log("created product");
      },
      err => console.log(err)
    )
  }

}
