import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AwardsService } from 'src/app/services/awards.service';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-my-awards',
  templateUrl: './my-awards.page.html',
  styleUrls: ['./my-awards.page.scss'],
})
export class MyAwardsPage implements OnInit {
  listAwards = [
  ];
  awards: any = {};
  show = false;
  ended = false;
  constructor(
    private awardsService: AwardsService,
    private auth: AuthService,
    public modalController: ModalController,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.getAdwards();
  }
  async getAdwards(): Promise<void> {
    const user = JSON.parse(
      await (
        await Storage.get({ key: 'userdb' })
      ).value
    );
    this.awardsService.getMyAwards(user.id_Gamer).subscribe((data: []) => {
      console.log(data);
      this.listAwards = data.reverse();
      this.ended = true;
    });
  }

}
