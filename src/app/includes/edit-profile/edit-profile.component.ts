import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';
import {ProfileService} from '../../services/profile/profile.service';
import {AuthService} from '../../services/auth/auth.service';
import {CategoryService} from '../../services/category/category.service';
import {UploadService} from '../../services/upload/upload.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  md5 = new Md5();

  @Input()
  id: any;

  form: any = {};

  profile: any;
  certificates: any;
  categories: any;
  cats: any;

  loading = false;
  updating = false;

  fileInput(files: FileList) {
    this.form.pic = files.item(0);
  }

  selectCategory(id) {
    if (this.categories.indexOf(id) === -1) {
      this.categories.push(id);
    } else {
      this.categories.splice(this.categories.indexOf(id), 1);
    }
  }

  removeCertificate(certificate) {

    this.profileService.removeCertificate(this.id, certificate).then(
      data => {
        if (data.success === true) {
          window.location.reload();
        } else if (data.error === true) {
          alert(data.message);
          window.location.reload();
        }
    });
  }

  onSubmit() {

    this.updating = true;

    if (this.form.pic) {
      this.uploadService.upload(this.id, this.form.pic).then(
        data => {
          if (data.success === true) {
          } else if (data.error === true) {
            alert(data.message);
            window.location.reload();
          }
        }
      );
    }

    if (this.form.password) {
      this.form.password = this.md5.appendStr(this.form.password).end();
    } else {
      this.form.password = 'NULL';
    }

    this.profileService.edit(this.id, this.form, this.categories).then(
      data => {
        if (data.success === true) {
          this.router.navigate(['profile/' + this.id]);
        } else if (data.error === true) {
          alert(data.message);
          window.location.reload();
        }
        this.updating = false;
      }
    );
  }

  constructor(
    public router: Router,
    private profileService: ProfileService,
    private authService: AuthService,
    private categoryService: CategoryService,
    private uploadService: UploadService
  ) { }

  ngOnInit() {

    this.loading = true;

    this.profileService.getInfo(this.id).then(
      data => {
        if (data.success === true) {

          this.authService.getUser().then(
            user => {
              if (data == null) {
                alert('Unauthorized');
                this.router.navigate(['']);
              } else {
                if (data.data.id === user) {

                  this.profile = data.data;
                  this.certificates = data.certificates;

                  this.categories = [];

                  data.categories.forEach(cat => {
                    this.categories.push(cat.category_id);
                  });

                  this.form.fname = this.profile.fname;
                  this.form.lname = this.profile.lname;
                  this.form.email = this.profile.email;
                  this.form.add1 = this.profile.address1;
                  this.form.add2 = this.profile.address2;
                  this.form.city = this.profile.city;
                  this.form.zip = this.profile.zip;
                  this.form.description = this.profile.description;

                  if (this.profile.rate) {
                    this.form.rate = this.profile.rate.replace(',', '.');
                  }

                  this.form.ctitle = null;
                  this.form.cdesc = null;
                  this.form.cissuer = null;

                  this.categoryService.all('all').then(
                    cat => {
                      this.cats = cat.data;
                      this.loading = false;
                    }
                  );

                } else {
                  alert('Unauthorized');
                  this.router.navigate(['']);
                }
              }
            }
          );

        } else if (data.error === true) {
          alert(data.message);
          window.location.reload();
        }
      }
    );

  }

}
