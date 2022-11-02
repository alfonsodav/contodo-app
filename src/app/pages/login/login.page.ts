import { Component, OnInit } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  urlRetorno: string;
  datos: any;
  condiciones = true;
  picture;
  name;
  email;
  password;

  constructor(
    private authService: AuthService,
    private alertIon: AlertController
  ) {}

  ngOnInit() {}
  loginGoogle() {
    /* if (this.platform.is('android')) {
      //this.authService.loginGoogleAndroid();
      this.authService.signInWithGoogle();
    } else {
      //this.authService.loginGoogleWeb();
      this.authService.signInWithGoogle();
    } */
  }
  loginFacebook() {
    /*  if (this.platform.is('android')) {
      //this.authService.loginFacebookAndroid();
      this.authService.signInWithFacebook();
    } else {
      //this.authService.loginFacebook();
      this.authService.signInWithFacebook();
    } */
  }
  simpleLogin() {
    if (!this.email || !this.password) {
      return alert('Correo y contraseña obligatorios');
    }
    this.authService.login(this.email, this.password).subscribe(
      (user: any) => {
        console.log(user);
        if (user.id_Gamer === 0) {
          return this.createAlert(
            'Tu usuario no se encuentra registrado',
            'error'
          );
        }
        this.authService.saveLocal(user);
      },
      (error) => {
        if (error.status === 404) {
          return this.createAlert(
            'Tu usuario no se encuentra registrado',
            'error'
          );
        } else {
          this.createAlert(
            'ocurrio un error inesperado, verifica tu conexion y vuelve a intentar',
            'warn'
          );
        }
      }
    );
  }
  async createAlert(message, type) {
    const myalert = await this.alertIon.create({
      subHeader: message,
      cssClass: 'user-alert',
      buttons: [{ text: 'Continuar', cssClass: type, role: 'destructive' }],
    });
    return await myalert.present();
  }
}
