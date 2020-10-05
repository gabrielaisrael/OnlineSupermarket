import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { ShopService } from '../../shop/services/shop.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  // @Input() updateCartDetails;
  getErrorMessageEmailIncorrect() {
    if (this.formGroup.controls.email.hasError('email')) {
      return '';
    }

    return this.formGroup.controls.email.hasError('email')
      ? 'Not a valid Email'
      : '';
  }

  getErrorMessageEmail() {
    if (this.formGroup.controls.email.hasError('required')) {
      return 'You must enter a email';
    }

    return this.formGroup.controls.email.hasError('email')
      ? 'Not a valid Email'
      : '';
  }

  getErrorMessagePassword() {
    if (this.formGroup.controls.password.hasError('required')) {
      return 'You must enter a Password';
    }

    return this.formGroup.controls.password.hasError('password')
      ? 'Not a valid password'
      : '';
  }

  constructor(
    public router: Router,
    public _fb: FormBuilder,
    public _ls: LoginService,
    public _ss: ShopService
  ) {}
  email: string;
  password: string;
  public isLogin;
  public hasCart;
  public totalPrice;
  public orders;
  errorLogin: 'error';
  public user_numberId;
  public errorMsg = '';
  public orderDate;
  public submittedOrder;

  ngOnInit() {
    this.formGroup = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      isAdmin: 0,
    });
    const token = localStorage.getItem('token');
    if (token != undefined) {
      console.log('token', token);
      this._ss.isLogin = true;
    } else {
      this._ss.isLogin = false;
    }

    this.user_numberId = JSON.parse(localStorage.getItem('user_numberId'));
    this._ss.checkCartExists(this.user_numberId).subscribe((result: any) => {
      console.log(result, typeof result);
      console.log(result[0].dateCreated);
      this._ss.isLogin = true;
      console.log(result.length);

      if (result.length > 0) {
        this._ss.dateCreated = result[0].dateCreated;
        this._ss.hasCart = true;
        localStorage.setItem('hasCart', JSON.stringify(this._ss.hasCart));
        localStorage.setItem(
          'dateCreated',
          JSON.stringify(this._ss.dateCreated)
        );
      } else {
        this._ss.hasCart = false;
        localStorage.setItem('hasCart', JSON.stringify(this._ss.hasCart));
      }
    });
    console.log(this._ss.hasCart);
    this._ss.hasCart = JSON.parse(localStorage.getItem('hasCart'));
    this._ss.submittedOrder = JSON.parse(
      localStorage.getItem('submittedOrder')
    );
  }

  onLogin() {
    this._ls.login(this.formGroup.value).subscribe((result) => {
      let userData = JSON.parse(result);
      console.log('xxxx', userData);
      const token = userData.token;
      const firstname = userData.firstname;
      const user_numberId = userData.user_numberId;
      const cart_id = userData.id;
      const isAdmin = userData.isAdmin == 1;
      console.log(isAdmin, token);

      if (token != undefined) {
        // this._ss.isLogin = true
        localStorage.setItem('token', token);
        localStorage.setItem('firstname', JSON.stringify(firstname));

        if (localStorage.token) {
          this._ss.isLogin = true;
        }

        this._ss.firstname = firstname;
        console.log(firstname);
        console.log(this._ss.isLogin);
        console.log('token');

        if (isAdmin) {
          this.router.navigate(['adminarea']), console.log('adminarea');
        } else {
          localStorage.setItem('user_numberId', user_numberId);
          this.user_numberId = user_numberId;
          this._ss.checkCartExists(user_numberId).subscribe(
            (result: any) => {
              console.log(result, typeof result);
              console.log(result[0].dateCreated);
              this._ss.isLogin = true;
              console.log(result.length);

              if (result.length > 0) {
                this._ss.dateCreated = result[0].dateCreated;
                this._ss.hasCart = true;
                localStorage.setItem(
                  'hasCart',
                  JSON.stringify(this._ss.hasCart)
                );
                localStorage.setItem(
                  'dateCreated',
                  JSON.stringify(this._ss.dateCreated)
                );
              } else {
                this._ss.hasCart = false;
                localStorage.setItem(
                  'hasCart',
                  JSON.stringify(this._ss.hasCart)
                );
              }
              console.log(this._ss.hasCart);
              this._ss.getOrderOfUser(user_numberId).subscribe(
                (res) => {
                  this.orders = res;
                  console.log(this.orders);
                  if (this.orders.length > 0) {
                    this._ss.orderDate = res[0].orderDate;
                    this._ss.submittedOrder = true;
                    localStorage.setItem(
                      'submittedOrder',
                      JSON.stringify(this._ss.submittedOrder)
                    );
                    this._ss.totalPrice = res[0].totalPrice;
                    localStorage.setItem(
                      'orderDate',
                      JSON.stringify(this._ss.orderDate)
                    );
                    localStorage.setItem(
                      'totalPrice',
                      JSON.stringify(this._ss.totalPrice)
                    );
                    console.log(this._ss.totalPrice);
                  } else {
                    this._ss.submittedOrder = false;
                    localStorage.setItem(
                      'submittedOrder',
                      JSON.stringify(this._ss.submittedOrder)
                    );
                  }
                  console.log(this._ss.submittedOrder);
                },
                (err) => console.log(err)
              );
            },
            (err) => {
              console.log(err);
            }
          );
        }
      }
      (err) => console.log(err);
    });
  }

  startShop() {
    localStorage.getItem(this.user_numberId);
    console.log('ID', this.user_numberId);
    console.log(this._ss.addNewCart);
    this._ss.addNewCart({ user_numberId: this.user_numberId }).subscribe(
      (res) => {
        console.log(res, this.user_numberId),
          this.router.navigate(['allproducts']);
      },

      (err) => console.log(err)
    );
    this._ss.getCartById(this.user_numberId).subscribe(
      (res) => {
        console.log(res), this.router.navigate(['allproducts']);
        localStorage.setItem('cart_id', res[0].id);
      },
      (err) => console.log(err)
    );
  }

  resumeShop() {
    localStorage.getItem(this.user_numberId);

    this._ss.getCartById(this.user_numberId).subscribe(
      (res) => {
        console.log(res), this.router.navigate(['allproducts']);
        localStorage.setItem('cart_id', res[0].id);
      },
      (err) => console.log(err)
    );
  }
}
