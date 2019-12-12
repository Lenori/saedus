import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../services/category/category.service';

@Component({
  selector: 'app-home-categories',
  templateUrl: './home-categories.component.html',
  styleUrls: ['./home-categories.component.css']
})
export class HomeCategoriesComponent implements OnInit {

  categories: any;
  loaded: any;

  constructor(
    private categoryService: CategoryService
  ) { }

  urlHyphen(str) {
    return str.replace(' ', '-');
  }

  ngOnInit() {

    this.loaded = 'false';

    this.categoryService.all('home').then(
      data => {
        if (data.success === true) {
          this.categories = data.data;
          this.loaded = true;
        } else if (data.error === true) {
          console.log(data.message);
        }
      }
    );

  }

}
