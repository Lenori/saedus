import { Component, OnInit, Input } from '@angular/core';
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

  constructor(
    private projectService: ProjectService,
    public router: Router
  ) { }

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
  }

}
