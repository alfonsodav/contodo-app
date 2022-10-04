import { Component, Input, OnInit } from '@angular/core';
import { Share } from '@capacitor/share';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-claimed',
  templateUrl: './claimed.component.html',
  styleUrls: ['./claimed.component.scss'],
  providers: [SocialSharing]
})
export class ClaimedComponent implements OnInit {
  @Input() awards;
  @Input() user;
  constructor(
    public modalController: ModalController,
    private socialSharing: SocialSharing
  ) {}

  ngOnInit() {}

  async shareAwards() {
    await Share.share({
      title: 'See cool stuff',
      text: 'Really awesome thing you need to see right meow',
      url: 'http://ionicframework.com/',
      dialogTitle: 'Share with buddies',
    });
  }

  shareFacebook() {
    this.socialSharing.shareViaFacebook(
      `Felizmente canjee este premio ${this.awards.premio.nombre} gracias a Contodo`,
      this.awards.premio.imgB64
    );
  }
  shareWhatsapp() {
    this.socialSharing.shareViaWhatsApp(
      `Felizmente canjee este premio ${this.awards.premio.nombre} gracias a Contodo`,
      this.awards.premio.imgB64
    );
  }
  shareTwitter() {
    this.socialSharing.shareViaTwitter(
      `Felizmente canjee este premio ${this.awards.premio.nombre} gracias a Contodo`,
      this.awards.premio.imgB64
    );
  }
  closeModal(){
    this.modalController.dismiss();
  }
}
