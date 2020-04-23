import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  success: any;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    public router: Router) { }

  ngOnInit() {
    this.authService.getUser().then(
      data => {
        if (data != null) {
          this.router.navigate(['']);
        }
      }
    );

    this.authService.confirmEmail(this.route.snapshot.params.code).then(
      data => {
        if (data.success === true) {
          this.success = true;
          setTimeout(() => this.router.navigate(['']), 2000);
        } else if (data.error === true) {
          alert(data.message);
          window.location.reload();
        }
      }
    );

  }

}
