import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
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
  condiciones= true;
  picture;
  name;
  email;

  constructor(
    private platform: Platform,
    private authService: AuthService
    ) { }

  ngOnInit() {

  }
  loginGoogle() {
    if (this.platform.is('android')) {
      this.authService.loginGoogleAndroid();
    } else {
      this.authService.loginGoogleWeb();
    }
  }
  loginFacebook() {
    if (this.platform.is('android')) {
      this.authService.loginFacebookAndroid();
    } else {
      this.authService.loginFacebook();
    }
  }

  logout() {
    this.authService.logout();
  }
}
