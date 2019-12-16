import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css']
})
export class BidComponent implements OnInit {

  form: any = {};

  loading = false;

  constructor(
    public dialogRef: MatDialogRef<BidComponent>
  ) {}

  onSubmit() {

    this.loading = true;
    this.dialogRef.close(this.form.price);

  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
