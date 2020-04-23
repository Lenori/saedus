import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileService} from '../../services/profile/profile.service';
import {AuthService} from '../../services/auth/auth.service';
import {EventEmitterService} from '../../services/chat/event-emitter.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id: any;
  loaded: any;
  profile: any;
  categories: any;
  reviews: any;
  numberReviews: any;
  certificates: any;
  portfolios: any;
  languages: any;
  numberCertificates: any;

  edit = false;
  loggedIn = false;

  constructor(
    private profileService: ProfileService,
    public router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private eventEmitterService: EventEmitterService
  ) {

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  }

  openChat() {
    if (this.loggedIn) {
      this.eventEmitterService.onChatOpen(this.id);
    } else {
      this.router.navigate(['sign-in']);
    }
  }

  ngOnInit() {

    this.loaded = false;

    this.id = this.route.snapshot.params.id;

    this.profileService.getInfo(this.id).then(
      data => {
        if (data.success === true) {

          this.authService.getUser().then(
            user => {

              if (user == null) {
                this.edit = false;
              } else {
                this.loggedIn = true;
              }

              if (data.data.id === user) {
                this.edit = true;
              }

              this.profile = data.data;
              console.log(this.profile);
              this.profile.rate = parseInt(this.profile.rate);
              this.categories = data.categories;
              this.reviews = data.reviews;
              this.numberReviews = data.number_reviews;
              this.certificates = data.certificates;
              this.portfolios = data.portfolio;
              this.numberCertificates = data.number_certificates;
              this.languages = data.languages;

              this.loaded = true;

              }
          );

        } else if (data.error === true) {
          alert(data.message);
          this.router.navigate(['']);
        }
      }
    );

  }

}
