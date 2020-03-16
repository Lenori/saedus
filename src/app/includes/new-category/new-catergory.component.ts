import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-catergory.component.html',
  styleUrls: ['./new-catergory.component.css']
})
export class NewCategoryComponent implements OnInit {

  form: any = {};

  loading = false;

  constructor(
    public dialogRef: MatDialogRef<NewCategoryComponent>
  ) {}

  onSubmit() {

    this.loading = true;
    this.dialogRef.close(this.form);

  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
