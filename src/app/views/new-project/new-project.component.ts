import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {ProjectService} from '../../services/project/project.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  form: any = {};
  user: any;

  loading = false;

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
          this.user = data;
        }
      }
    );

  }

  onSubmit() {

    this.loading = true;

    if (!this.form.title || !this.form.description || !this.form.tags || !this.form.budget) {
      alert('Please fill all the fields.');
      this.loading = false;
      return;
    }

    this.projectService.create(this.user, this.form.title, this.form.description, this.form.tags, this.form.budget).then(
      data => {
        if (data.success === true) {
          this.router.navigate(['my-projects']);
        } else if (data.error === true) {
          alert(data.message);
        }
        this.loading = false;
      }
    );
  }

}
