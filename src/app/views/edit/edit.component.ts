import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: any;
  type: any;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.type = this.route.snapshot.params.type;
    this.id = this.route.snapshot.params.id;

  }

}
