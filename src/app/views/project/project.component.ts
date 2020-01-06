import { Component, OnInit, Inject } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {ProjectService} from '../../services/project/project.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {BidComponent} from '../bid/bid.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  id: any;
  project: any;
  loaded: any;
  user: any;
  owner: any;
  awarded: any;
  edit: any;
  milestones: any;

  constructor(
    private authService: AuthService,
    private projectService: ProjectService,
    public router: Router,
    private route: ActivatedRoute,
    private matDialog: MatDialog
  ) { }

  openBid() {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.matDialog.open(BidComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(value => {

      this.projectService.bid(this.id, this.user, value).then(
        data => {
          if (data.success === true) {
            this.router.navigate(['bids/' + this.id]);
          } else if (data.error === true) {
            alert(data.message);
          }
        }
      );

    });
  }

  ngOnInit() {

    this.loaded = false;
    this.edit = false;

    this.id = this.route.snapshot.params.id;

    this.authService.getUser().then(
      data => {
        if (data == null) {
          this.router.navigate(['']);
        } else {
          this.user = data;
          this.projectService.one(this.id).then(
            info => {
              if (info.success === true) {
                this.project = info.project;
                this.owner = info.owner;
                this.awarded = info.awarded;
                this.milestones = info.milestones;
                console.log(info);
                if (info.project.owner === data) {
                  this.edit = true;
                } else {
                  this.edit = false;
                }
                this.loaded = true;
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
