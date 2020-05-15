import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {SearchService} from '../../services/search/search.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: any;
  user: any;

  constructor(
    private authService: AuthService,
    private searchService: SearchService,
    public router: Router
  ) { }

  ngOnInit() {

    this.authService.getUser().then(
      data => {
        if (data == null) {
          this.router.navigate(['sign-in']);
        } else {
          this.searchService.searchProjects().then(
            projects => {
              if (projects.success === true) {
                this.projects = projects.projects;
              } else if (projects.error === true) {
                alert(projects.message);
                this.router.navigate(['']);
              }
            }
          );
        }
      }
    );

  }

}
