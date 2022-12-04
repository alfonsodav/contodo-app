import { Component, Input, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() menu: boolean;
  @Input() pointRefres: boolean;
  user: any = {
    phone: '',
    name: '',
    email: '',
    picture: '',
  };
  constructor(private auth: AuthService, private toast: ToastController) {}

  ngOnInit() {
    this.auth.user$.subscribe(async (data) => {
      if (!data) {
        await Preferences.get({ key: 'userdb' }).then(
          (user) => (this.user = JSON.parse(user.value))
        );
        console.log('carga local', this.user);
        this.refreshData();
        return;
      }
      this.user = data;
    });
  }
  async refreshData() {
    await this.auth.getUserToID(this.user.id_Gamer).then((data) => {
      this.auth.user.id_Gamer = data.id_Gamer;
      this.auth.user.picture = 'data:image/jpg;base64,' + data.photo_Profile;
      data.picture = 'data:image/jpg;base64,' + data.photo_Profile;
      this.auth.user.direction = data.direction;
      this.auth.user.name = data.firt_Name;
      data.name = data.firt_Name;
      this.auth.user.email = data.email;
      this.auth.user.phone = data.phone;
      this.auth.user.token = data.token;
      this.auth.user.birtDate = data.birtDate;
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { picture, photo_Profile, ...user } = data;
      this.user = data;
      Preferences.set({ key: 'userdb', value: JSON.stringify(user) });
    });
    await Preferences.get({ key: 'userdb' }).then(
      (user) => (this.user = JSON.parse(user.value))
    );
  }
  async toastLaunch() {
    const toast = await this.toast.create({
      message: 'Refrescando datos del usuario',
      duration: 2500,
      position: 'top',
    });

    await toast.present();
    this.refreshData();
  }
}
