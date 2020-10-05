import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { OrderService } from '../service/order.service';
import { MatDialog } from '@angular/material/dialog';
import { ReceiptComponent } from '../receipt/receipt.component';
import { ShopService } from '../../shop/services/shop.service';
import { ReceiptErrorComponent } from '../receipt-error/receipt-error.component';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  formGroup: FormGroup;
  controls: FormControl;
  public user_numberId;
  public city;
  public street;
  public address;
  public dates;
  public resDates;
  // public toDate;
  public totalPrice = localStorage.getItem('total');
  public cart_id = localStorage.getItem('cart_id');
  constructor(
    public _formBuilder: FormBuilder,
    public _os: OrderService,
    public dialog: MatDialog,
    public _ss: ShopService
  ) {}
  cities = [
    { name: 'Jerusalem' },
    { name: 'Tel Aviv' },
    { name: 'Haifa' },
    { name: 'Rishon Letzyon' },
    { name: 'Ashdod' },
    { name: 'Petach Tikva' },
    { name: 'Beer Sheva' },
    { name: 'Netania' },
    { name: 'Holon' },
    { name: 'Bnei Brak' },
  ];
  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      cityShipping: ['', Validators.required],
      stretShipping: ['', Validators.required],
      toDate: ['', Validators.required],
      creditCard: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35d{3})d{11})$'
          ),
        ],
      ],
    });

    this.user_numberId = localStorage.getItem('user_numberId');
    console.log(localStorage.getItem('user_numberId'));
    this._os.getAddressById(this.user_numberId).subscribe(
      (res) => {
        console.log(res);
        this.address = res;
      },
      (err) => console.log(err)
    );
  }

  getValue() {
    this.city = this.address[0].city;
    console.log(this.city);
    this.formGroup.controls.cityShipping.setValue(this.city);
    this.street = this.address[0].street;
    console.log(this.street);
    this.formGroup.controls.stretShipping.setValue(this.street);
  }

  onSelectDate() {
    this._os.getOrderDates().subscribe(
      (res) => {
        console.log(res);
        this.resDates = res;
        this.dates = this.resDates.map((date) => new Date(date.toDate));
        console.log(this.dates);

        for (let day of this.dates) {
          if (day == this.formGroup.controls.toDate.value.toString()) {
            alert(
              'Sorry, all shipments are occupied for this date, please choose a different date.'
            );
            this.formGroup.controls.toDate.setValue('');
          }
        }
      },
      (err) => console.log(err)
    );
  }

  submitOrder() {
    let totalPrice = this.totalPrice;
    let user_numberid = this.user_numberId;
    let cart_id = this.cart_id;
    const allDetailsToRequest = {
      ...this.formGroup.value,
      user_numberid,
      totalPrice,
      cart_id,
    };

    console.log(allDetailsToRequest);
    if (
      this.formGroup.controls.toDate.valid &&
      this.formGroup.controls.cityShipping.valid &&
      this.formGroup.controls.stretShipping.valid &&
      this.formGroup.controls.creditCard.valid
    ) {
      this._os.cartCompleted(this.cart_id).subscribe(
        (res) => {
          console.log(res);
          this._ss.submittedOrder = true;
          localStorage.setItem(
            'submittedOrder',
            JSON.stringify(this._ss.submittedOrder)
          );
        },
        (err) => console.log(err)
      );
      this._os.addOrderToUser(allDetailsToRequest).subscribe(
        (res) => {
          console.log(res, allDetailsToRequest);

          let dialogRef = this.dialog.open(ReceiptComponent, {});
          dialogRef.afterClosed().subscribe((res) => {});
        },
        (err) => console.log(err)
      );
    } else {
      let dialogRef = this.dialog.open(ReceiptErrorComponent, {});
      dialogRef.afterClosed().subscribe((res) => {});
    }
  }
}
