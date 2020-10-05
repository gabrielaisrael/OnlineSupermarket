import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../service/admin.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {

  constructor(public route: ActivatedRoute,
    public _as: AdminService,
    public _fb: FormBuilder,
    public router: Router) { }

  public categories;
  public formEdit: FormGroup;
  public productId;



  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.productId = id
    this._as.getProductById(id).subscribe(
      res => {
        this.productId = res,
          err => console.log(err)
      }
    )
    this.productId = id;
    this._as.getAllCategories().subscribe(
      res => this.categories = res,
      err => console.log(err)
    );
    // this.route.params.subscribe(
    //   (params:any)=>{
    //     const id = params.id
    //     console.log(id)
    //   }
    // )


    // this.formEdit = this._fb.group({
    //   productName: [this._as.productVal.productName],
    //   price: [this._as.productVal.price],
    //   img_url: [""],
    //   category_id: [0]
    // });
  }

  public edit() {
 
      this._as.editProduct(this._as.productVal.id, this._as.productVal).subscribe(
        res => {
          console.log(this.productId)
          alert("Your product was edit!");
          this.router.navigate(["/adminarea"])
        },
        err => console.log(err)
      );
    }

  }

