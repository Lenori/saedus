import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchService} from '../../services/search/search.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  professionals: any;
  term: any;
  loaded: any;
  total: any;

  type = 'search';

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private searchService: SearchService
  ) { }

  urlDehyphen(str) {
    return str.replace('-', ' ');
  }

  ngOnInit() {

    this.term = this.urlDehyphen(this.route.snapshot.params.q);

    this.searchService.searchProfessionals(this.term).then(
      data => {
        if (data.success === true) {
          this.professionals = data.data;
          this.total = data.total;
          this.loaded = true;
        } else if (data.error === true) {
          alert(data.message);
          this.router.navigate(['']);
        }
      }
    );

  }

}
