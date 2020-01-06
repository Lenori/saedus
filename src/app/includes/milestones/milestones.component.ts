import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-milestones',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.css']
})
export class MilestonesComponent implements OnInit {

  @Input()
  milestones: any;

  constructor() { }

  ngOnInit() {
  }

}
