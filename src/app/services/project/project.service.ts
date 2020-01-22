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

  async bid(id, user, value): Promise<any> {

    const endpoint = 'methods/project/bid/bid.php';
    const params = {
      id: id,
      user: user,
      value: value
    };

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const response = await this.http.post(this.url + '/' + endpoint, params, {headers}).toPromise();
    return response;

  }

  async milestone(id, title, value): Promise<any> {

    const endpoint = 'methods/project/milestone/create.php';
    const params = {
      project: id,
      title: title,
      value: value
    };

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const response = await this.http.post(this.url + '/' + endpoint, params, {headers}).toPromise();
    return response;

  }

  async releaseMilestone(id, prof): Promise<any> {

    const endpoint = 'methods/project/milestone/release.php';
    const params = {
      id: id,
      prof: prof
    };

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const response = await this.http.post(this.url + '/' + endpoint, params, {headers}).toPromise();
    return response;

  }

  async update(project, status, professional, bid, value): Promise<any> {

    const endpoint = 'methods/project/status/status.php';
    const params = {
      project: project,
      status: status,
      professional: professional,
      bid: bid,
      value: value
    };

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const response = await this.http.post(this.url + '/' + endpoint, params, {headers}).toPromise();
    return response;

  }

  async edit(id, form): Promise<any> {

    const endpoint = 'methods/edit/project/project.php';
    const params = {
      id: id,
      title: form.title,
      description: form.description,
      tags: form.tags,
      budget: form.budget
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
