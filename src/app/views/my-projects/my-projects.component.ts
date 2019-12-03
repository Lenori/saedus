import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {ProjectService} from '../../services/project/project.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent implements OnInit {

  projects: any;
  user: any;

  constructor(
    private authService: AuthService,
    private projectService: ProjectService,
    public router: Router
  ) { }

  ngOnInit() {

    this.authService.getUser().then(
      data => {
        if (data == null) {
          this.router.navigate(['sign-in']);
        } else {
          this.projectService.list(data).then(
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
