/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
/* import { Browser } from '@capacitor/browser'; */
import { Storage } from '@capacitor/storage';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { PublicityPage } from '../../publicity/publicity.page';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-candy',
  templateUrl: './candy.component.html',
  styleUrls: ['./candy.component.scss'],
})
export class CandyComponent implements OnInit {
  @Input() game;
  user;
  gameKandy = false;

  constructor(
    private auth: AuthService,
    public modalController: ModalController,
    public sanitizer: DomSanitizer
  ) {
    Storage.get({ key: 'userdb' }).then(
      (db) => (this.user = JSON.parse(db.value))
    );
  }
  ngOnInit(): void {}

  openGame() {
    this.gameKandy = true;
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: PublicityPage,
      cssClass: 'my-custom-class',
    });
    await modal.present();
    return await modal.onWillDismiss();
  }
  async presentGame() {
    const modal = await this.modalController.create({
      component: FrameComponent,
      cssClass: 'present-game',
      breakpoints: [0, 0.5, 0.9, 1],
      initialBreakpoint: 0.9,
      componentProps: {
        user: this.user,
        url: this.game.url
      },
    });
    await modal.present();
    return await modal.onWillDismiss();
  }
/*   async openCapacitorSite() {
    this.presentModal().then(async () => {
      await Browser.open({
        url:
          'http://38.17.54.101/kandy-crush/index.html?id_gamer=' +
          this.user.id_Gamer,
      });
      await Browser.addListener('browserFinished', () => {
        this.auth.refresUser(this.user.id_Gamer);
      });
      this.auth.refresUser(this.user.id_Gamer);
    });
  } */
}

@Component({
  selector: 'app-frame',
  template: `<ion-content class="fondo-game">
    <div class="content">
      <iframe
        class="frame"
        [src]="
          sanitizer.bypassSecurityTrustResourceUrl(
            url + 'index.html?id_gamer=' +
              user?.id_Gamer
          )
        "
      >
      </iframe>
    </div>
  </ion-content>`,
  styleUrls: ['./candy.component.scss'],
})
export class FrameComponent implements OnInit{
  @Input() user;
  @Input() url;
  constructor(
    public modalController: ModalController,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
  }
}
