import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.css']
})
export class ChangePasswordFormComponent implements OnInit {

  md5 = new Md5();

  user: any;
  form: any = {};

  loading = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    public router: Router) { }

  onSubmit() {

    this.loading = true;

    if (this.form.password !== this.form.passwordRepeat) {
      alert('The passwords inserted do not match.');
    }

    this.authService.changePassword(this.route.snapshot.queryParams.code, this.md5.appendStr(this.form.password).end()).then(
      data => {
        if (data.success === true) {
          alert(data.message);
          this.router.navigate(['sign-up']);
        } else if (data.error === true) {
          alert(data.message);
          window.location.reload();
        }
        this.loading = false;
      }
    );
  }

  ngOnInit() {

    this.authService.getUser().then(
      data => {
        if (data != null) {
          this.router.navigate(['']);
        }
      }
    );

  }

}
