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
  condiciones = true;
  picture;
  name;
  email;

  constructor(private platform: Platform, private authService: AuthService) {}

  ngOnInit() {}
  loginGoogle() {
    if (this.platform.is('android')) {
      //this.authService.loginGoogleAndroid();
      this.authService.signInWithGoogle();
    } else {
      //this.authService.loginGoogleWeb();
      this.authService.signInWithGoogle();
    }
  }
  loginFacebook() {
    if (this.platform.is('android')) {
      //this.authService.loginFacebookAndroid();
      this.authService.signInWithFacebook();
    } else {
      //this.authService.loginFacebook();
      this.authService.signInWithFacebook();
    }
  }

  logout() {
    this.authService.signOut();
  }
}
