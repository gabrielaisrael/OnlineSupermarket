import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { LoginService } from '../../home/service/login.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ShopService } from '../../shop/services/shop.service';
import { MatHorizontalStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class RegisterComponent implements OnInit {
  @ViewChild(MatHorizontalStepper) stepper: MatHorizontalStepper;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  controls: FormControl;
  formDirective: FormGroupDirective;
  users: any = [];
  usersId: any = [];
  successMessage: 'registraction success';
  errorMessage: 'error';
  public isAdmin = 0;
  public errorId = '';
  isLinear = false;
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
  constructor(
    private _formBuilder: FormBuilder,
    private _ls: LoginService,
    public router: Router,
    public _ss: ShopService
  ) {}

  getErrorMessageEmailIncorrect() {
    if (this.firstFormGroup.controls.email.hasError('email')) {
      return '';
    }

    return this.firstFormGroup.controls.email.hasError('email')
      ? 'Not a valid Email'
      : '';
  }

  getErrorMessageEmail() {
    if (this.firstFormGroup.controls.email.hasError('required')) {
      return 'You must enter a email';
    }

    return this.firstFormGroup.controls.email.hasError('email')
      ? 'Not a valid Email'
      : '';
  }

  getErrorMessageId() {
    if (this.firstFormGroup.controls.number_id.hasError('required')) {
      return 'You must enter a ID';
    }

    return this.firstFormGroup.controls.number_id.hasError('number_id')
      ? 'Not a valid ID'
      : '';
  }

  getErrorMessagePassword() {
    if (this.firstFormGroup.controls.password.hasError('required')) {
      return 'You must enter a Password';
    }

    return this.firstFormGroup.controls.password.hasError('password')
      ? 'Not a valid password'
      : '';
  }

  getErrorMessageConfirmPassword(controlName: string) {
    if (this.firstFormGroup.controls[controlName].hasError('minlength')) {
      return 'Must be at least 2 characters';
    }

    return 'Passwords must match';
  }

  getErrorMessageCity() {
    if (this.secondFormGroup.controls.city.hasError('required')) {
      return 'You must enter a City';
    }

    return this.secondFormGroup.controls.city.hasError('city')
      ? 'Not a valid City'
      : '';
  }

  getErrorMessageStreet() {
    if (this.secondFormGroup.controls.street.hasError('required')) {
      return 'You must enter a Street';
    }

    return this.secondFormGroup.controls.street.hasError('street')
      ? 'Not a valid Street'
      : '';
  }

  getErrorMessageFirstname() {
    if (this.secondFormGroup.controls.firstname.hasError('required')) {
      return 'You must enter a Firstname';
    }

    return this.secondFormGroup.controls.firstname.hasError('firstname')
      ? 'Not a valid Firstname'
      : '';
  }

  getErrorMessageLastname() {
    if (this.secondFormGroup.controls.lastname.hasError('required')) {
      return 'You must enter a Lastname';
    }

    return this.secondFormGroup.controls.lastname.hasError('lastname')
      ? 'Not a valid Lastname'
      : '';
  }

  public passwordMatchValidator(g: FormGroup) {
    const password = g.get('password').value;
    const confirm = g.get('confirm_password').value;
    return password === confirm ? null : { mismatch: true };
  }

  confirmErrorMatcher = {
    isErrorState: (controls): boolean => {
      const controlInvalid = controls.touched && controls.invalid;
      const formInvalid =
        controls.touched &&
        this.firstFormGroup.get('password').touched &&
        this.firstFormGroup.invalid;
      return controlInvalid || formInvalid;
    },
  };

  ngOnInit() {
    this._ls.getAllUsers().subscribe(
      (res) => {
        this.users = res;
        console.log(this.users);
      },
      (err) => console.log(err)
    );
    this._ls.getAllIdNumbers().subscribe(
      (res) => {
        this.usersId = res;
        console.log(res);
      },
      (err) => console.log(err)
    );

    this.firstFormGroup = this._formBuilder.group(
      {
        number_id: ['', Validators.required],
        email: ['', Validators.required, Validators.email],
        password: ['', Validators.required],
        confirm_password: ['', Validators.required],
        isAdmin: 0,
      },
      { validator: this.passwordMatchValidator }
    );
    this.secondFormGroup = this._formBuilder.group({
      city: ['', Validators.required],
      street: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
    });
  }

  toNextStep() {
    console.log('usersId:', this.usersId);
    console.log(
      'this.firstFormGroup:',
      this.firstFormGroup,
      this.firstFormGroup.controls.number_id
    );

    const userArr = this.usersId.filter(
      (u) => u.numberId == this.firstFormGroup.controls.number_id.value
    );

    if (userArr[0]) {
      this.errorId = 'This id has already been registered';
    } else {
      console.log('id not exist');
      console.log(userArr);
      this.errorId = '';
    }
  }

  submit() {
    const allFormGroup = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
    };
    console.log(allFormGroup);
    this._ls.submitRegister(allFormGroup).subscribe(
      (data) => console.log(data, allFormGroup),
      (err) => console.log(err)
    );
    this._ls.login(this.firstFormGroup.value).subscribe((result) => {
      let userData = JSON.parse(result);
      console.log('xxxx', userData);
      const token = userData.token;
      console.log(token);
      localStorage.setItem('token', token);
    });
  }
}
