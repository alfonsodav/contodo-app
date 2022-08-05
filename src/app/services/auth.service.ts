/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GooglePlus } from '@awesome-cordova-plugins/google-plus/ngx';
import firebase from 'firebase/compat/app';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: any = {
    picture: null,
    name: null,
    email: null,
    phone: null,
  };
  pictureB64 = null;
  header = new HttpHeaders({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/x-www-form-urlencoded',
  });
  url = environment.api + 'api/Gamers';
  public user$ = new BehaviorSubject<any>(null);
  private webClientId = environment.webClientId;

  constructor(
    public auth: AngularFireAuth,
    private googlePlus: GooglePlus,
    private http: HttpClient,
    public router: Router
  ) {}

  async loginGoogleAndroid() {
    const res = await this.googlePlus.login({
      webClientId: this.webClientId,
      offline: true,
    });
    const resConfirmed = await this.auth.signInWithCredential(
      firebase.auth.GoogleAuthProvider.credential(res.idToken)
    );
    this.saveDataAndroid(resConfirmed, res);
  }
  async loginGoogleWeb() {
    console.log('web');
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    const res = await this.auth.signInWithPopup(provider);
    console.log(res.user.photoURL);
    this.saveDataWeb(res);
  }
  async loginFacebook() {
    console.log('Login con Facebook');
    const res = await this.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    );
    this.saveDataWeb(res);
  }
  async loginFacebookAndroid() {
    console.log('Login con Facebook');
    const res = await this.googlePlus.login({
      webClientId: this.webClientId,
      offline: true,
    });
    const resConfirmed = await this.auth.signInWithCredential(
      firebase.auth.FacebookAuthProvider.credential(res.idToken)
    );
    this.saveDataAndroid(resConfirmed, res);
  }
  async saveDataAndroid(resConfirmed, res) {
    const user = resConfirmed.user;
    localStorage.setItem('user', JSON.stringify(res.credential));
    localStorage.setItem('token', await user.getIdToken());
    this.user.picture = user.photoURL;
    this.user.name = user.displayName;
    this.user.email = user.email;
    this.user.phone = user.phoneNumber;
    await Storage.set({ key: 'user', value: JSON.stringify(this.user) });
    const inData = await this.getUserToEmail(user.email).catch((err) => null);
    if (inData) {
      await this.saveLocal(inData);
      return this.router.navigate(['/games']);
    }
    this.user.picture = user.photoURL;
    this.user.name = user.displayName;
    this.user.email = user.email;
    this.user.phone = user.phoneNumber;
    await Storage.set({ key: 'user', value: JSON.stringify(this.user) });
    this.user$.next({
      ...this.user,
      ...user,
    });

    await this.getImageUrl(this.user.picture)
      .then((data: Blob) => {
        console.log(data);
        const reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onloadend = () => {
          const base64String = reader.result;
          this.pictureB64 = base64String;
        };
      })
      .catch((err) => console.log(err));
    this.router.navigate(['/wellcome']);
  }
  async saveDataWeb(res) {
    console.log(res);
    const user: any = res.user;
    localStorage.setItem('user', JSON.stringify(res.credential));
    localStorage.setItem('token', await res.user.getIdToken());
    const inData = await this.getUserToEmail(user.email).catch((err) => null);
    if (inData) {
      /* this.user.id_Gamer = inData.id_Gamer;
      this.user.picture = 'data:image/jpg;base64,' + inData.photo_Profile;
      this.user.direction = inData.direction;
      this.user.name = inData.firt_Name;
      this.user.email = inData.email;
      this.user.phone = inData.phone;
      this.user.token = inData.token;
      await Storage.set({ key: 'userdb', value: JSON.stringify(inData) });
      this.user$.next({
        ...this.user,
        ...inData,
      }); */
      await this.saveLocal(inData);
      return this.router.navigate(['/games']);
    }
    this.user.picture = user.photoURL;
    this.user.name = user.displayName;
    this.user.email = user.email;
    this.user.phone = user.phoneNumber;
    await Storage.set({ key: 'user', value: JSON.stringify(this.user) });
    this.user$.next({
      ...this.user,
      ...user,
    });
    await this.getImageUrl(this.user.picture)
      .then((data: Blob) => {
        console.log(data);
        const reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onloadend = () => {
          const base64String = reader.result.toString();
          this.pictureB64 = base64String.split(',')[1];
        };
      })
      .catch((err) => console.log(err));
    this.router.navigate(['/wellcome']);
  }
  logout() {
    this.auth.signOut();
    Storage.clear();
  }
  getImageUrl(imageUrl: string): Promise<any> {
    return this.http.get(imageUrl, { responseType: 'blob' }).toPromise(); // responseType: 'blob'
  }
  getUserToEmail(email): Promise<any> {
    return this.http.get(this.url + `?email=${email}`).toPromise();
  }
  getUserToID(id = 0): Promise<any> {
    return this.http.get(this.url + `/${id || this.user.id_Gamer}`).toPromise();
  }
  async refresUser(id) {
    const inData = await this.getUserToID(id).catch((err) => null);
    if (inData) {
      this.saveLocal(inData);
    }
  }
  async saveLocal(inData) {
    this.user.id_Gamer = inData.id_Gamer;
    this.user.picture = 'data:image/jpg;base64,' + inData.photo_Profile;
    inData.picture = 'data:image/jpg;base64,' + inData.photo_Profile;
    this.user.direction = inData.direction;
    this.user.name = inData.firt_Name;
    inData.name = inData.firt_Name;
    this.user.email = inData.email;
    this.user.phone = inData.phone;
    this.user.token = inData.token;
    this.user.birtDate = inData.birtDate;
    await Storage.set({ key: 'userdb', value: JSON.stringify(inData) });
    this.user$.next({
      ...this.user,
      ...inData,
    });
  }

  registerUser(user): Promise<any> {
    console.log(user);
    const form = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      // eslint-disable-next-line @typescript-eslint/naming-convention
      firt_Name: user.name,
      last_Name: '',
      pass: '',
      email: user.email,
      phone: user.phone,
      direction: user.direction,
      token: '',
      birtDate: new Date(user.birtDate).toISOString(), // IMPORTANTE
      // eslint-disable-next-line @typescript-eslint/naming-convention
      photo_Profile_B64: this.pictureB64,
    };
    return this.http.post(this.url, form).toPromise();
  }
  updateUser(user): Promise<any> {
    const form = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      id_Gamer: user.id_Gamer,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      firt_Name: user.name,
      last_Name: '',
      pass: '',
      email: user.email,
      phone: user.phone,
      direction: user.direction,
      token: '',
      birtDate: new Date(user.birtDate).toISOString(),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      photo_Profile_B64: user.pictureB64,
    };
    return this.http.put(this.url + `/${form.id_Gamer}`, form).toPromise();
  }
  setPhoto(picture, user): Observable<any> {
    const form = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      id_Gamer: user.id_Gamer,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      firt_Name: user.name,
      last_Name: '',
      pass: '',
      email: user.email,
      phone: user.phone,
      direction: user.direction,
      token: '',
      birtDate: user.birtDate,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      photo_Profile_B64: picture,
    };
    return this.http.post(this.url + `/SetImageGamer?id=${user.id_Gamer}`, {
      id_Gamer: Number(user.id_Gamer),
      photo_Profile_B64: picture,
    });
  }
}
