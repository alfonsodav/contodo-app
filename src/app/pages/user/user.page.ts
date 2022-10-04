import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { AuthService } from 'src/app/services/auth.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  user: any = {
    phone: '',
    name: '',
    email: '',
    birtDate: '',
    pictureB64: '',
  };
  constructor(private auth: AuthService, private ionAlert: AlertController) {}

  ngOnInit() {
    this.auth.user$.subscribe(async (data) => {
      if (!data) {
        await Preferences.get({ key: 'userdb' }).then(
          (user) => (this.user = JSON.parse(user.value))
        );
        this.user.birtDate = new Date(this.user.birtDate).toLocaleDateString();
        console.log('carga local', this.user);
        return;
      }
      data.birtDate = new Date(data.birtDate).toLocaleDateString();
      this.user = data;
    });
    console.log(this.user);
  }
  async createAlert(message, type) {
    const myalert = await this.ionAlert.create({
      //htmlAttributes,
      subHeader: message,
      cssClass: 'user-alert',
      buttons: [{ text: 'Continuar', cssClass: type, role: 'destructive' }],
    });
    return await myalert.present();
  }

  async updateUser() {
    const id = await Preferences.get({ key: 'id' });
    console.log(id.value);
    if (Number(id.value)) {
      this.user.id_Gamer = id.value;
    }
    console.log(this.user);
    try {
      await this.auth.updateUser(this.user);
      this.auth.user$.next(this.user);
      await Preferences.set({
        key: 'userdb',
        value: JSON.stringify(this.user),
      });
      await this.createAlert('GRACIAS POR ACTUALIZAR TU INFORMACIÓN', 'succes');
    } catch (error) {
      console.log(error);
      await this.createAlert(
        'OCURRIO UN ERROR AL ACTUALIZAR TU INFORMACIÓN',
        'error'
      );
    }
    //this.auth.router.navigate(['/games']);
  }
  formatDate(value): string {
    return (this.user.birtDate = new Date(value).toLocaleDateString());
  }
  async updatePhoto() {
    const foto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      quality: 50,
      saveToGallery: true,
      promptLabelHeader: 'Foto de perfil',
      promptLabelCancel: 'Cancelar',
      promptLabelPhoto: 'Galeria',
      promptLabelPicture: 'Tomar foto',
    });
    this.user.pictureB64 = foto.base64String;
    this.user.picture = 'data:image/jpg;base64,' + foto.base64String;
    this.auth.setPhoto(this.user.pictureB64, this.user).subscribe((data) => {
      console.log(data);
      if (data.id_Gamer) {
        this.createAlert('Se actualizo tu imagen de perfil', 'succes');
      } else {
        this.createAlert(
          'OCURRIO UN ERROR AL ACTUALIZAR TU INFORMACIÓN',
          'error'
        );
      }
    });
    //console.log(foto);
  }
}
