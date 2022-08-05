import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AwardsService } from 'src/app/services/awards.service';
import { Storage } from '@capacitor/storage';
import { ClaimedComponent } from './claimed/claimed.component';


@Component({
  selector: 'app-awards',
  templateUrl: './awards.page.html',
  styleUrls: ['./awards.page.scss'],
})
export class AwardsPage implements OnInit {
  listAwards = [
    /* {
    nombre: 'televizor',
    descripcion: 'aaaaaaaaa',
    costo: '34343434'
  } */
  ];
  awards: any = {};
  show = false;
  user: any;
  constructor(
    private awardsService: AwardsService,
    private auth: AuthService,
    public modalController: ModalController,
    public toastController: ToastController,
  ) {
    console.log(this.auth.user.id_Gamer);
    if (this.auth.user.id_Gamer) {
      this.user = this.auth.user$.value;
    } else {
      Storage.get({ key: 'userdb' }).then(
        (user) => (this.user = JSON.parse(user.value))
      );
    }
  }

  ngOnInit() {
    this.getAdwards();
  }
  getAdwards(): void {
    this.awardsService.getList().subscribe((data) => {
      console.log(data);
      this.listAwards = data;
    });
  }
  async showClaimed(data){
    const modal = await this.modalController.create({
      component: ClaimedComponent,
      showBackdrop: true,
      swipeToClose: true,
      cssClass: 'modal-claimed',
      backdropDismiss: true,
      componentProps: {
        awards: data,
        user: this.user
      },
    });
    await modal.present();
  }
  async showDetail(item) {
    this.show = true;
    this.awards = item;
    const modal = await this.modalController.create({
      component: ModalComponent,
      breakpoints: [0, 0.2, 0.5, , 0.7, 1],
      cssClass: 'awardsDetail',
      initialBreakpoint: 0.7,
      componentProps: {
        awards: this.awards,
        user: this.user
      },
    });
    await modal.present();
    const {data} = await modal.onWillDismiss();
    if (data && data.id_Canje) {
      this.auth.refresUser(this.user.id_Gamer);
      this.showClaimed(data);
    } else if (data && !data.id_Canje) {
      this.presentToast();
    }
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Ocurrio un error mientras se procesaba el canje.',
      duration: 3000,
    });
    toast.present();
  }
}

@Component({
  selector: 'app-modal-content',
  template: `<ion-content class="details">
    <ion-title>{{ awards.nombre }}</ion-title>
    <div style="display: flex; width: 100%">
      <img [src]="'data:image/jpg;base64,' + awards.img" />
    </div>
    <div class="detail-content">
      <div>
        <sub>{{ awards.descripcion }}</sub>
        <h2>
          <ion-icon [src]="'assets/images/coin.svg'"></ion-icon>
          {{ awards.costo | currency }}
        </h2>
        <p *ngIf="awards.costo > user.puntaje">
          Necesitas <ion-icon [src]="'assets/images/coin.svg'"></ion-icon>
          {{ awards.costo - user.puntaje | currency }}
        </p>
        <sub *ngIf="awards.costo > user.puntaje" color="medium"
          >No tienes los puntos suficientes para canjear este premio</sub
        >
      </div>
      <div class="button">
        <ion-button
          class="contodo-button"
          (click)="canjear()"
          size="large"
          expand="block"
          color="light"
          ><span>Canjear premio</span></ion-button
        >
      </div>
    </div>
  </ion-content>`,
  styleUrls: ['./awards.page.scss'],
})
export class ModalComponent {
  @Input() awards: any;
  @Input() user: any;
  constructor(
    private awardsService: AwardsService,
    public modalController: ModalController,
    public toastController: ToastController,
    public ionAlert: AlertController
  ) {
    console.log(this.user);
    if (!this.user) {
      Storage.get({ key: 'userdb' }).then(
        (user) => (this.user = JSON.parse(user.value))
      );
    }
  }
  async launchAlert(){
    const alert = await this.ionAlert.create({
      message: 'Premio reclamado con exito'
    });
    alert.present();
  }

  async canjear() {
    console.log(this.awards);
    if (this.awards.costo > this.user.puntaje) {
      this.presentToast();
    }
    if (!this.user.id_Gamer) {
      this.user = JSON.parse(
        await (
          await Storage.get({ key: 'userdb' })
        ).value
      );
    }
    console.log(this.user);
    this.awardsService
      .newTrade(this.user.id_Gamer, this.awards.id_Premio)
      .then((data) => {
        console.log(data);
        this.modalController.dismiss(data);
      });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'No tienes suficientes puntos.',
      duration: 3000,
    });
    toast.present();
  }
}
