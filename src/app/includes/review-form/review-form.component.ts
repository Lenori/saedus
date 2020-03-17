import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';
import {ProjectService} from '../../services/project/project.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {

  @Input() creatorId;
  @Input() userId;
  @Input() projectId;

  form: any = {};

  loading = false;

  constructor(
    private projectService: ProjectService,
    public router: Router
  ) { }

  onSubmit() {

    this.loading = true;

    if ((!this.form.review || this.form.review.trim() == '') || this.form.grade == 0) {
      alert('Please write a comment and select a grade from the star rating system.');
      return;
    }

    this.projectService.review(this.creatorId, this.userId, this.projectId, this.form.review.trim(), this.form.grade).then(
      data => {
        if (data.success === true) {
          window.location.reload();
        } else if (data.error === true) {
          alert(data.message);
          window.location.reload();
        }
        this.loading = false;
      }
    );
  }

  ngOnInit() {
    this.form.grade = 0;
    this.form.review = '';
  }

  changeGrade(grade) {
    this.form.grade = grade;
  }

}
