import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit {

  md5 = new Md5();

  user: any;
  form: any = {};

  loading = false;

  constructor(
    private authService: AuthService,
    public router: Router) { }

  onSubmit() {

    this.loading = true;

    this.authService.create(this.form.fname, this.form.lname, this.form.email, this.md5.appendStr(this.form.password).end(), this.form.add1, this.form.add2, this.form.zip).then(
      data => {
        if (data.success === true) {
          this.authService.login(data.id);
          this.router.navigate(['']);
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
