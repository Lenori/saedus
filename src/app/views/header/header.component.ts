import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {WalletService} from '../../services/wallet/wallet.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showMenu = null;

  user: any;
  wallet: any;

  constructor(
    private authService: AuthService,
    private walletService: WalletService,
    public router: Router
  ) { }

  logout() {

    this.authService.logout().then(
      data => {
        this.user = null;
        location.reload();
      }
    );

  }

  ngOnInit() {

    this.showMenu = false;

    this.user = null;
    this.authService.getUser().then(
      info => {
        this.user = info;
        this.walletService.get(this.user).then(
          data => {
            if (data.success === true) {
              this.wallet = data.wallet;
            } else if (data.error === true) {
              alert(data.message);
            }
          });
      });

  }

}
