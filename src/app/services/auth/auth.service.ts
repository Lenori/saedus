import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = '/api';

  id: any;

  async create(fname, lname, email, password, add1, add2, city, zip): Promise<any> {

    const endpoint = 'methods/auth/create/create.php';
    const params = {
      fname: fname,
      lname: lname,
      email: email,
      password: password,
      add1: add1,
      add2: add2,
      city: city,
      zip: zip
    };

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const response = await this.http.post(this.url + '/' + endpoint, params, {headers}).toPromise();
    return response;

  }

  async checkLogin(email, password): Promise<any> {

    const endpoint = 'methods/auth/login/login.php';
    const params = {
      email: email,
      password: password
    };

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const response = await this.http.post(this.url + '/' + endpoint, params, {headers}).toPromise();
    return response;

  }

  async recoverPassword(email): Promise<any> {

    const endpoint = 'methods/auth/recover/recover.php';
    const params = {
      email: email
    };

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const response = await this.http.post(this.url + '/' + endpoint, params, {headers}).toPromise();
    return response;

  }

  async changePassword(code, password): Promise<any> {

    const endpoint = 'methods/auth/password/password.php';
    const params = {
      code: code,
      password: password
    };

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const response = await this.http.post(this.url + '/' + endpoint, params, {headers}).toPromise();
    return response;

  }

  async confirmEmail(code): Promise<any> {

    const endpoint = 'methods/auth/email/email.php';
    const params = {
      code: code
    };

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const response = await this.http.post(this.url + '/' + endpoint, params, {headers}).toPromise();
    return response;

  }

  async login(id): Promise<any> {

    localStorage.removeItem('user');
    localStorage.setItem('user', id);

    return 'Login OK';

  }

  async getUser(): Promise<any> {

    return await localStorage.getItem('user');

  }

  async logout() {

    localStorage.removeItem('user');

    return 'Logout OK';

  }

  constructor(
    private http: HttpClient,
  ) {
    if (environment.production) {
      this.url = 'http://18.224.180.162/api';
    } else {
      this.url = '/api';
    }
  }
}
