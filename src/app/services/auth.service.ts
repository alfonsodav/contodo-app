/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Preferences } from '@capacitor/preferences';
//import { FirebaseAuthentication } from '@capacitor-firebase/authentication';

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

  constructor(
    //public auth: AngularFireAuth,
    //private googlePlus: GooglePlus,
    private http: HttpClient,
    public router: Router
  ) {}

  login(email, password) {
    return this.http.post(environment.api + 'api/login', { email, password });
  }
  /* async signInWithFacebook() {
    const result = await FirebaseAuthentication.signInWithFacebook();
    this.saveDataWeb(result);
    return result.user;
  }

  async signInWithGoogle() {
    const result = await FirebaseAuthentication.signInWithGoogle();
    this.saveDataWeb(result);
    return result.user;
  }

  async signOut() {
    await FirebaseAuthentication.signOut();
  } */

  async saveDataAndroid(resConfirmed, res) {
    const user = resConfirmed.user;
    localStorage.setItem('user', JSON.stringify(res.credential));
    localStorage.setItem('token', await user.getIdToken());
    this.user.picture = user.photoURL;
    this.user.name = user.displayName;
    this.user.email = user.email;
    this.user.phone = user.phoneNumber;
    await Preferences.set({ key: 'user', value: JSON.stringify(this.user) });
    const inData = await this.getUserToEmail(user.email).catch((err) => null);
    if (inData) {
      await this.saveLocal(inData);
      return this.router.navigate(['/games']);
    }
    this.user.picture = user.photoURL;
    this.user.name = user.displayName;
    this.user.email = user.email;
    this.user.phone = user.phoneNumber;
    await Preferences.set({ key: 'user', value: JSON.stringify(this.user) });
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
    const user: any = res.user;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', await res.credential.idToken);
    const inData = await this.getUserToEmail(user.email).catch((err) => null);
    if (inData) {
      await this.saveLocal(inData);
      return this.router.navigate(['/games']);
    }
    this.user.picture = user.photoURL;
    this.user.name = user.displayName;
    this.user.email = user.email;
    this.user.phone = user.phoneNumber;
    await Preferences.set({ key: 'user', value: JSON.stringify(this.user) });
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
  /* logout() {
    this.auth.signOut();
    Preferences.clear();
  } */
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
    const { picture, photo_Profile, ...user } = inData;
    await Preferences.set({ key: 'userdb', value: JSON.stringify(user) });
    this.user$.next({
      ...this.user,
      ...inData,
    });
    this.router.navigate(['/games']);
  }

  registerUser(user): Promise<any> {
    console.log(user);
    const [dia, mes, año] = user.birtDate.split('/');
    //const birtDate = new Date(`${mes}/${dia}/${año}`).toISOString();
    const form = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      firt_Name: user.name,
      last_Name: '',
      pass: user.pass,
      email: user.email,
      phone: user.phone || '12345678',
      direction: user.direction || '',
      token: '',
      birtDate: '2001-10-01T04:00:00.000Z', //new Date(birtDate).toISOString(), // IMPORTANTE
      // eslint-disable-next-line @typescript-eslint/naming-convention
      photo_Profile_B64: user.pictureB64 || '',
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

  deleteUser(id) {
    console.log('borrar', id);
    return this.http.delete(`${this.url}/${id}`);
  }
}
