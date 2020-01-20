import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  md5 = new Md5();

  user: any;
  form: any = {};

  loading = false;

  constructor(
    private authService: AuthService,
    public router: Router) { }

  onSubmit() {

    this.loading = true;

    this.authService.checkLogin(this.form.email, this.md5.appendStr(this.form.password).end()).then(
      data => {
        if (data.success === true) {
          this.authService.login(data.id);
          this.router.navigate(['']);
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

    this.authService.getUser().then(
      data => {
        if (data != null) {
          this.router.navigate(['']);
        }
      }
    );

  }

}
