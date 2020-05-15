import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.css']
})
export class MilestoneComponent implements OnInit {

  form: any = {};

  loading = false;

  constructor(
    public dialogRef: MatDialogRef<MilestoneComponent>
  ) {}

  onSubmit() {

    this.loading = true;
    const data = {title: this.form.title, value: this.form.price};
    this.dialogRef.close(data);

  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
