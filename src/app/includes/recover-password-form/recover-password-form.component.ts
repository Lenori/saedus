import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {NavigationExtras, Router} from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-recover-password-form',
  templateUrl: './recover-password-form.component.html',
  styleUrls: ['./recover-password-form.component.css']
})
export class RecoverPasswordFormComponent implements OnInit {

  form: any = {};

  loading = false;

  constructor(
    private authService: AuthService,
    public router: Router) { }

  onSubmit() {

    this.loading = true;

    this.authService.recoverPassword(this.form.email).then(
      data => {
        if (data.success === true) {
          alert(data.message);
          setTimeout(() => window.location.replace('/'), 2000);
        } else if (data.error === true) {
          alert(data.message);
        }
        this.loading = false;
      }
    );
  }

  ngOnInit() {
  }

}
