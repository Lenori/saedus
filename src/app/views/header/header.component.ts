import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {WalletService} from '../../services/wallet/wallet.service';

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
    private walletService: WalletService
  ) { }

  ngOnInit() {

    this.user = null;
    this.authService.getUser().then(
      info => {
        this.user = info;
        this.walletService.get(this.user).then(
          data => {
            console.log(data);
            if (data.success == true) {
              this.wallet = data.wallet;
            } else if (data.error == true) {
              alert(data.message);
            }
          });
      });



  }

}
