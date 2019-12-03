import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private url = '/api';

  id: any;

  async create(owner, title, description, tags, budget): Promise<any> {

    const endpoint = 'methods/project/create/create.php';
    const params = {
      owner: owner,
      title: title,
      description: description,
      tags: tags,
      budget: budget
    };

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const response = await this.http.post(this.url + '/' + endpoint, params, {headers}).toPromise();
    return response;

  }

  async list(owner): Promise<any> {

    const endpoint = 'methods/project/list/list.php';
    const params = {
      owner: owner
    };

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const response = await this.http.post(this.url + '/' + endpoint, params, {headers}).toPromise();
    return response;

  }

  async one(id): Promise<any> {

    const endpoint = 'methods/project/list/one.php';
    const params = {
      id: id
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
