import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {ProjectService} from '../../services/project/project.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-bids',
  templateUrl: './bids.component.html',
  styleUrls: ['./bids.component.css']
})
export class BidsComponent implements OnInit {

  id: any;
  project: any;
  bids: any;
  loaded: any;

  type = 'bids';

  constructor(
    private authService: AuthService,
    private projectService: ProjectService,
    public router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.loaded = false;

    this.id = this.route.snapshot.params.id;

    this.authService.getUser().then(
      data => {
        if (data == null) {
          this.router.navigate(['']);
        } else {
          this.projectService.one(this.id).then(
            info => {
              if (info.success === true) {
                if (info.project.owner === data) {
                  this.project = info.project;
                  this.bids = info.bids;
                  this.loaded = true;
                } else {
                  this.router.navigate(['']);
                }
              } else if (info.error === true) {
                alert(info.message);
                this.router.navigate(['']);
              }
            }
          );
        }
      }
    );

  }

}
