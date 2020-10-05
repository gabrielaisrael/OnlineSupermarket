import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  MainUrl;
  public firstname;
  public isLogin;
  public userVal = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    number_id: 0,
    city: '',
    street: '',
    isAdmin: 0,
  };

  constructor(public http: HttpClient) {
    this.MainUrl = environment.MainUrl;
  }

  public getAllUsers() {
    return this.http.get(this.MainUrl + 'users');
  }

  public getAllIdNumbers() {
    return this.http.get(this.MainUrl + 'users/id/numberId');
  }

  public submitRegister(body) {
    return this.http.post(this.MainUrl + 'users/register', body, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text',
    });
  }

  public login(body) {
    return this.http.post(this.MainUrl + 'users/login', body, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text',
    });
  }

  checkEmail(email: string) {
    return this.http.get(this.MainUrl + 'users').pipe(
      delay(3000),
      map((users: { email: any[] }) => users.email),
      // tap(console.log),
      map((users: { email: string }[]) =>
        users.filter((v) => v.email === email)
      ),
      // tap(console.log),
      map((users: any[]) => users.length > 0)
      // tap(console.log)
    );
  }
}
