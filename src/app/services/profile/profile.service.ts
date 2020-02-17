import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private url = '/api';

  id: any;

  async getInfo(id): Promise<any> {

    const endpoint = 'methods/profile/info/info.php';
    const params = {
      id: id
    };

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const response = await this.http.post(this.url + '/' + endpoint, params, {headers}).toPromise();
    console.log('response: ' + response);
    return response;

  }

  async removeCertificate(user, certificate): Promise<any> {

    const endpoint = 'methods/edit/profile/certificates.php';
    const params = {
      id: user,
      cremove: certificate
    };

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const response = await this.http.post(this.url + '/' + endpoint, params, {headers}).toPromise();
    return response;

  }

  async removePortfolio(user, portfolio): Promise<any> {

    const endpoint = 'methods/edit/profile/portfolio.php';
    const params = {
      id: user,
      premove: portfolio
    };

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const response = await this.http.post(this.url + '/' + endpoint, params, {headers}).toPromise();
    return response;

  }

  async removeLanguage(user, lang): Promise<any> {

    const endpoint = 'methods/edit/profile/languages.php';
    const params = {
      id: user,
      lremove: lang
    };

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const response = await this.http.post(this.url + '/' + endpoint, params, {headers}).toPromise();
    return response;

  }

  async edit(id, form, categories): Promise<any> {

    const endpoint = 'methods/edit/profile/profile.php';
    const params = {
      id: id,
      fname: form.fname,
      lname: form.lname,
      email: form.email,
      add1: form.add1,
      add2: form.add2,
      city: form.city,
      zip: form.zip,
      password: form.password,
      rate: form.rate,
      description: form.description,
      ctitle: form.ctitle,
      cdesc: form.cdesc,
      cissuer: form.cissuer,
      ltitle: form.ltitle,
      website: form.website,
      facebook: form.facebook,
      instagram: form.instagram,
      twitter: form.twitter,
      categories: categories
    };

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const response = await this.http.post(this.url + '/' + endpoint, params, {headers}).toPromise();
    return response;

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
