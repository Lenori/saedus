import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  private url = '/api';

  async all(): Promise<any> {

    const endpoint = 'methods/languages/list/list.php';

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const response = await this.http.post(this.url + '/' + endpoint, {}, {headers}).toPromise();
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
