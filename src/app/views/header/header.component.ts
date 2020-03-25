import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {WalletService} from '../../services/wallet/wallet.service';
import {Router, ActivatedRoute} from '@angular/router';
import {ChatAdapter, IChatController} from 'ng-chat';
import {DemoAdapter} from '../../services/chat/adapter';
import {EventEmitterService} from '../../services/chat/event-emitter.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('ngChatInstance', {static: false})
  protected ngChatInstance: IChatController;

  public adapter: ChatAdapter;

  showMenu = null;

  user: any;
  wallet: any;

  username: any;

  constructor(
    private authService: AuthService,
    private walletService: WalletService,
    public router: Router,
    private route: ActivatedRoute,
    private eventEmitterService: EventEmitterService,
    private http: HttpClient
  ) {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
    });
  }

  logout() {

    this.authService.logout().then(
      data => {
        this.user = null;
        location.reload();
      }
    );

  }

  ngOnInit() {

    this.showMenu = false;

    this.user = null;
    this.authService.getUser().then(
      info => {
        this.user = info;

        this.adapter = new DemoAdapter(this.user, this.http);
        if (this.eventEmitterService.subsVar == undefined) {
          this.eventEmitterService.subsVar = this.eventEmitterService.invokeFirstComponentFunction.subscribe((userId) => {
            this.adapter.listFriends().toPromise().then(all => {
              const participant = all.find(c => c.participant.id == userId).participant;
              if (participant) {
                this.ngChatInstance.triggerOpenChatWindow(participant);
              } else {
                this.adapter.sendMessage({fromId: this.user, toId: userId, message: 'Hi. I would like to chat with you!' });
                this.adapter.listFriends();
                this.ngChatInstance.triggerOpenChatWindow(participant);
              }
            });
          });
        }

        this.walletService.get(this.user).then(
          data => {
            if (data.success === true) {
              this.wallet = data.wallet;
            } else if (data.error === true) {
              alert(data.message);
            }
          });
      });
  }

}
