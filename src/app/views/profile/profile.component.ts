import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileService} from '../../services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id: any;
  loaded: any;
  profile: any;
  reviews: any;
  numberReviews: any;
  certificates: any;
  numberCertificates: any;

  constructor(
    private profileService: ProfileService,
    public router: Router,
    private route: ActivatedRoute
  ) {

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  }

  ngOnInit() {

    this.loaded = false;

    this.id = this.route.snapshot.params.id;

    this.profileService.getInfo(this.id).then(
      data => {
        if (data.success === true) {
          this.profile = data.data;
          this.reviews = data.reviews;
          this.numberReviews = data.number_reviews;
          this.certificates = data.certificates;
          this.numberCertificates = data.number_certificates;
          this.loaded = true;
        } else if (data.error === true) {
          alert(data.message);
          this.router.navigate(['']);
        }
      }
    );

  }

}
