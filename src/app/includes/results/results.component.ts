import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ProjectService} from '../../services/project/project.service';
import {Router} from '@angular/router';

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

  constructor(
    private projectService: ProjectService,
    public router: Router
  ) { }

  changeRatingFilter(value) {
    this.filtersForm.rating = value;
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
    this.filtersForm.price = 0;
    console.log(this.data);
  }

}
