import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private url = '/api';

  async searchProjects(): Promise<any> {

    const endpoint = 'methods/search/projects/projects.php';
    const params = {
    };

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const response = await this.http.post(this.url + '/' + endpoint, params, {headers}).toPromise();
    return response;

  }

  async searchProfessionals(term, rating = 0, price = 0, languages = [], cities = []): Promise<any> {

    const endpoint = 'methods/search/professionals/professionals.php';
    const params = {
      term: term,
      rating: rating,
      price: price,
      languages: languages,
      cities: cities,
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
