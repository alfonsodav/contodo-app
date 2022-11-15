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
      await this.createAlert(
        'GRACIAS POR ACTUALIZAR TU INFORMACIÓN',
        'success'
      );
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
        this.createAlert('Se actualizo tu imagen de perfil', 'success');
      } else {
        this.createAlert(
          'OCURRIO UN ERROR AL ACTUALIZAR TU INFORMACIÓN',
          'error'
        );
      }
    });
    //console.log(foto);
  }
  async modalDeleteUser() {
    const alert = await this.ionAlert.create({
      header:
        'Estas Seguro que desea eliminar su cuenta y toda su información? ',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          role: 'confirm',
        },
      ],
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
    if (role === 'confirm') {
      this.auth
        .deleteUser(this.user.id_Gamer)
        .subscribe((data) => console.log(data));
      this.auth.router.navigate(['/']);
    }
  }
  async changePassword() {
    const alert = await this.ionAlert.create({
      header: 'Completa la informacion',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          role: 'confirm',
        },
      ],
      inputs: [
        {
          id: 'email',
          label: 'Correo electronico',
          placeholder: 'email@mail.com',
          type: 'email',
        },
        {
          id: 'oldpass',
          label: 'Contraseña actual',
          type: 'password',
          placeholder: 'Contraseña actual',
          attributes: {
            minlength: 8,
            maxlength: 10,
          },
        },
        {
          id: 'newpass',
          label: 'Contraseña nueva',
          type: 'password',
          placeholder: 'Contraseña nueva',
          attributes: {
            minlength: 8,
            maxlength: 10,
          },
        },
      ],
    });

    await alert.present();
    const { role, data } = await alert.onDidDismiss();
    console.log(data);
    if (role === 'confirm') {
      this.auth.changePassword(data.values).subscribe(
        (res: any) =>
          this.createAlert('Contraseña cambiada satisfactoriamente', 'success'),
        (err) =>
          this.createAlert(
            'Ocurrio un error, verifique los datos e intente nuevamente',
            'error'
          )
      );
    }
  }
}
