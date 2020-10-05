import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  MainUrl;
  public name = '';
  public isExist: boolean = false;

  public receiptFile;
  public totalPriceReceipt;

  constructor(public http: HttpClient) {
    this.MainUrl = environment.MainUrl;
  }

  public getAddressById(user_numberId) {
    console.log('user_numberId', user_numberId);
    return this.http.get(this.MainUrl + 'users/' + user_numberId);
  }

  public getOrderDates() {
    return this.http.get(this.MainUrl + 'order/orders/dates');
  }

  public addOrderToUser(body) {
    console.log('body', body);
    return this.http.post(this.MainUrl + 'order/add', body, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text',
    });
  }

  public cartCompleted(id) {
    return this.http.put(this.MainUrl + 'order/cartCompleted/' + id, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text',
    });
  }

  public createReceipt(body): Observable<any> {
    return this.http.post(this.MainUrl + 'order/receiptPdf', body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      responseType: 'text',
    });
  }

  public downloadReceipt(): Observable<any> {
    return this.http.get(this.MainUrl + 'order/download/receipt', {
      headers: { Authorization: localStorage.getItem('token') },
      responseType: 'text',
    });
  }
}
