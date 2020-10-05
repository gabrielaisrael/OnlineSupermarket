import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  MainUrl;

  public productVal = {
    id:0,
    productName: "",
    price: 0,
    img_url: "",
    category_id: 0
  };

  constructor(public http: HttpClient) {
    this.MainUrl = environment.MainUrl;
  }

  public getAllProducts() {
    return this.http.get(this.MainUrl + "shop/products")
  }

  public getProductById(id) {
    console.log('id', id)
    return this.http.get(this.MainUrl + "shop/products/" + id)
  }

  public getAllCategories() {
    return this.http.get(this.MainUrl + "shop/categories")
  }

  public getProductsByCategory(id) {
    return this.http.get(this.MainUrl + "shop/category/product/" + id)
  }
  public editProduct(id, body) {
    return this.http.put(this.MainUrl + "admin/edit/" + id, body, {
      headers: { 'Content-Type': 'application/json' },
      responseType: "text"
    })

  }

  public addProduct(body) {
    return this.http.post(this.MainUrl + "admin/add", body, {
      headers: { 'Content-Type': 'application/json' },
      responseType: "text"
    })

  }
}
