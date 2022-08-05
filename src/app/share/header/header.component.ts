import { Component, Input, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() menu: boolean;
  user: any = {
    phone: '',
    name: '',
    email: '',
    picture: ''
  };
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.user$.subscribe(async data => {
      if(!data){
        await Storage.get({key: 'userdb'}).then(user => this.user = JSON.parse(user.value));
        console.log('carga local', this.user);
        return;
      }
      this.user = data;
    });
    console.log(this.user);
  }
}
