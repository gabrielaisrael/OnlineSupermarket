import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  MainUrl;
  constructor(public http: HttpClient) {
    this.MainUrl = environment.MainUrl;
  }

  public user_numberId;
  public isLogin: boolean = false;
  public hasCart: boolean = false;
  public submittedOrder: boolean = false;
  public cartDate;
  public orderDate;
  public totalPrice;
  public dateCreated;
  public firstname;

  public getAllProducts() {
    return this.http.get(this.MainUrl + 'shop/products');
  }

  public getAllCategories() {
    return this.http.get(this.MainUrl + 'shop/categories');
  }

  public getProductsByCategory(id) {
    console.log('id', id);
    return this.http.get(this.MainUrl + 'shop/category/product/' + id);
  }

  public addProductToCart(body) {
    return this.http.post(this.MainUrl + 'shop/add', body, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text',
    });
  }

  public addToMyCart(body) {
    return this.http.post(this.MainUrl + 'shop/add', body, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text',
    });
  }

  public checkCartExists(user_numberId) {
    console.log('user_numberid', user_numberId);
    return this.http.get(this.MainUrl + 'shop/carts/' + user_numberId);
  }

  public addNewCart(body) {
    return this.http.post(this.MainUrl + 'shop/addNewCart', body, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text',
    });
  }
  public getCartById(user_numberId) {
    console.log('user_numberId', user_numberId);
    return this.http.get(this.MainUrl + 'shop/carts/' + user_numberId);
  }

  public getSumProducts() {
    return this.http.get(this.MainUrl + 'shop/sumProducts');
  }

  public getSumOrders() {
    return this.http.get(this.MainUrl + 'order/sumOrders');
  }

  public getProductsOfCart(user_numberid) {
    console.log('user_numberId', user_numberid);
    return this.http.get(this.MainUrl + 'shop/carts/products/' + user_numberid);
  }

  public getOrderOfUser(user_numberid) {
    console.log('user_numberId', user_numberid);
    return this.http.get(this.MainUrl + 'order/' + user_numberid);
  }

  public deleteProduct(prodId, cartId) {
    return this.http.delete(
      this.MainUrl + 'shop/remove/' + prodId + '/' + cartId
    );
  }

  public deleteAllProducts(cartId) {
    return this.http.delete(this.MainUrl + 'shop/removeAll/' + cartId);
  }

  public search(productName) {
    return this.http.post(
      this.MainUrl + 'shop/search',
      { productName },
      {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'text',
      }
    );
  }
}
