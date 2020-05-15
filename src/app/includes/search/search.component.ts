import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  form: any = {};

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {

    this.router.navigate(['/search/' + this.form.search + '']);

  }

}
