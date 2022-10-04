import { Component, OnInit, ViewChild } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController, IonDatetime, ModalController } from '@ionic/angular';
import { PublicityPage } from '../publicity/publicity.page';

@Component({
  selector: 'app-wellcome',
  templateUrl: './wellcome.page.html',
  styleUrls: ['./wellcome.page.scss'],
})
export class WellcomePage implements OnInit {
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;
  user: any = {
    phone: '',
    name: '',
    email: '',
    direction: '',
  };
  dateValue = '';
  constructor(
    private auth: AuthService,
    private alertIon: AlertController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.auth.user$.subscribe(async (data) => {
      if (!data) {
        await Preferences.get({ key: 'user' }).then(
          (user) => (this.user = JSON.parse(user.value))
        );
        console.log('carga local', this.user);
        return;
      }
      this.user = data;
    });
    console.log(this.user);
  }
  async launchAlert() {
    const alert = await this.alertIon.create({
      message:
        'Ocurrio un error inesperado al guardar tus datos, por favor verifica y vuelve a intentar',
      buttons: ['Continuar'],
    });
    alert.present();
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: PublicityPage,
      cssClass: 'my-custom-class',
    });
    await modal.present();
    return await modal.onWillDismiss();
  }
  async continue() {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { id_Gamer, ...user } = this.user;
    const data = await this.auth.registerUser(user).catch((err) => {
      console.log(err);
      this.launchAlert();
    });
    console.log(data);
    if (!data || data.id_Gamer === 0) {
      this.launchAlert();
    }
    await Preferences.set({ key: 'user', value: JSON.stringify(this.user) });
    this.auth.user.id = data.id_Gamer;
    await Preferences.set({ key: 'id', value: data.id_Gamer });
    await this.auth.refresUser(data.id_Gamer);
    this.presentModal().then(() => this.auth.router.navigate(['/games']));
  }
  formatDate(value): string {
    return (this.user.birtDate = new Date(value).toLocaleDateString());
  }
}
