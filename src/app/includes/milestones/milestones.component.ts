import { Component, OnInit, Input } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {MilestoneComponent} from '../../views/milestone/milestone.component';
import {ProjectService} from '../../services/project/project.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-milestones',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.css']
})
export class MilestonesComponent implements OnInit {

  @Input()
  milestones: any;

  @Input()
  project: any;

  released: any;

  openMilestone() {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.matDialog.open(MilestoneComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {

      if (data) {

        this.projectService.milestone(this.project, data.title, data.value).then(
          response => {
            if (response.success === true) {
              window.location.reload();
            } else if (response.error === true) {
              alert(response.message);
            }
          }
        );

      }

    });
  }

  releaseMilestone(id) {

    this.projectService.releaseMilestone(id).then(
      response => {
        if (response.success === true) {
          window.location.reload();
        } else if (response.error === true) {
          alert(response.message);
        }
      }
    );

  }

  constructor(
    private projectService: ProjectService,
    public router: Router,
    private route: ActivatedRoute,
    private matDialog: MatDialog
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() { }

}
