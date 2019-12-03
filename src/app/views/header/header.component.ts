import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showMenu = null;

  user: any;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {

    this.user = null;
    this.authService.getUser().then(data => { this.user = data; });

  }

}
