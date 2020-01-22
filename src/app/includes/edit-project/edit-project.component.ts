import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProjectService} from '../../services/project/project.service';
import {Md5} from 'ts-md5';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  md5 = new Md5();

  @Input()
  id: any;

  project: any;

  form: any = {};

  loading = false;
  updating = false;

  onSubmit() {

    this.updating = true;

    this.projectService.edit(this.id, this.form).then(
      data => {
        if (data.success === true) {
          this.router.navigate(['project/' + this.id]);
        } else if (data.error === true) {
          alert(data.message);
          window.location.reload();
        }
        this.updating = false;
      }
    );
  }

  constructor(
    public router: Router,
    private projectService: ProjectService,
    private authService: AuthService
  ) { }

  ngOnInit() {

    this.loading = true;

    this.projectService.one(this.id).then(
      data => {
        if (data.success === true) {

          this.authService.getUser().then(
            user => {
              if (data == null) {
                alert('Unauthorized');
                this.router.navigate(['my-projects']);
              } else {
                if (data.project.owner === user) {

                  this.project = data.project;

                  this.form.title = this.project.title;
                  this.form.description = this.project.description;
                  this.form.tags = this.project.tags;
                  this.form.budget = this.project.budget.replace(',', '.');

                  this.loading = false;

                } else {
                  alert('Unauthorized');
                  this.router.navigate(['my-projects']);
                }
              }
            }
          );

        } else if (data.error === true) {
          alert(data.message);
          window.location.reload();
        }
      }
    );

  }

}
