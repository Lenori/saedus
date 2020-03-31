import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ProjectService} from '../../services/project/project.service';
import {Router} from '@angular/router';
import {LanguagesService} from '../../services/languages/languages.service';
import {CitiesService} from '../../services/cities/cities.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  @Input()
  type: any;

  @Input()
  data: any;

  @Input()
  project: any;

  @Output()
  onApplyFilters: EventEmitter<any> = new EventEmitter();

  filtersForm: any = {};
  languages = [];
  cities = [];

  constructor(
    private projectService: ProjectService,
    private languagesService: LanguagesService,
    private citiesService: CitiesService,
    public router: Router,
  ) { }

  changeRatingFilter(value) {
    this.filtersForm.rating = value;
  }

  toggleLanguageFilter(value) {
    const idx = this.filtersForm.languages.indexOf(value);
    if (idx >= 0) {
      this.filtersForm.languages.splice(idx, 1);
    } else {
      this.filtersForm.languages.push(value);
    }
  }

  toggleCityFilter(value) {
    const idx = this.filtersForm.cities.indexOf(value);
    if (idx >= 0) {
      this.filtersForm.cities.splice(idx, 1);
    } else {
      this.filtersForm.cities.push(value);
    }
  }

  applyFilters() {
    this.onApplyFilters.emit(this.filtersForm);
  }

  updateProject(professional, bid, value) {

    this.projectService.update(this.project, 1, professional, bid, value).then(
      info => {
        if (info.success === true) {
          this.router.navigate(['my-projects']);
        } else if (info.error === true) {
          alert(info.message);
        }
      }
    );

  }

  ngOnInit() {
    this.filtersForm.rating = 0;
    this.filtersForm.price = 15;
    this.filtersForm.languages = [];
    this.filtersForm.cities = [];
    this.filtersForm.name = '';

    this.languagesService.all().then(
      data => {
        if (data.success === true) {
          this.languages = data.data.sort();
        } else if (data.error === true) {
          alert(data.message);
          window.location.reload();
        }
      }
    );

    this.citiesService.all().then(
      data => {
        if (data.success === true) {
          this.cities = data.data.sort();
        } else if (data.error === true) {
          alert(data.message);
          window.location.reload();
        }
      }
    );
  }

}
