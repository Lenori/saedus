import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-new-certificate',
  templateUrl: './new-certificate.component.html',
  styleUrls: ['./new-certificate.component.css']
})
export class NewCertificateComponent implements OnInit {
  form: any = {};

  loading = false;

  constructor(
    public dialogRef: MatDialogRef<NewCertificateComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    if (data) {
      this.form.id = data.id;
      this.form.ctitle = data.title;
      this.form.cdesc = data.description;
      this.form.cissuer = data.issuer;
      this.form.edit = true;
    } else {
      this.form.edit = false;
    }
  }

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
