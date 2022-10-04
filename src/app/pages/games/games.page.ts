import { Component, NgZone, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { GamesService } from 'src/app/services/games.service';

import { ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { PluginListenerHandle } from '@capacitor/core';
import { ToastController } from '@ionic/angular';

//import { AdMob, AdOptions } from '@capacitor-community/admob';
import { ReplaySubject } from 'rxjs';
import { interstitialOptions } from '../shared/ad.options';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {
  game: any = {};
  user;
  gameList = [];
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    direction: 'vertical',
    /*  pagination: {
      type: 'bullets'
    } */
  };
  isLoading: boolean;
  /* options: AdOptions = {
    adId: interstitialOptions.adId,
  }; */

  private readonly lastInterstitialEvent$$ = new ReplaySubject<{
    name: string;
    value: any;
  }>(1);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public readonly lastInterstitialEvent$ =
    this.lastInterstitialEvent$$.asObservable();

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public isPrepareInterstitial = false;
  private appMargin = 0;
  private readonly listenerHandlers: PluginListenerHandle[] = [];

  constructor(
    private gameServices: GamesService,
    private readonly ngZone: NgZone
  ) {
    // Prepare interstitial banner
    this.prepareInterstitial();
  }

  ngOnInit() {
    Preferences.get({ key: 'userdb' }).then((user) => {
      this.user = JSON.parse(user.value);
    });
    this.getGames();
  }
  async getGames() {
    return await this.gameServices.getList().then((data: any[]) => {
      this.gameList = data;
      this.getPuntaje(data[0].id_Game);
    });
  }

  async getPuntaje(id = 0, event?) {
    console.log(event, this.gameList);
    let index = 0;
    if (event) {
      index = await event.target.getActiveIndex();
    }
    //await this.getGames();
    console.log(index);

    this.gameServices
      .getPointGame(this.user.id_Gamer, this.gameList[index].id_Game ?? id)
      .subscribe((data) => {
        this.game = data;
      });
  }

  /**
   * ==================== Interstitial ====================
   */
  async prepareInterstitial() {
    this.isLoading = true;

    try {
      /* const result = await AdMob.prepareInterstitial(interstitialOptions);
      console.log('Interstitial Prepared', result);
      this.isPrepareInterstitial = true; */
      //this.showInterstitial();
    } catch (e) {
      console.error('There was a problem preparing the Interstitial', e);
    } finally {
      this.isLoading = false;
    }
  }

  /* async showInterstitial() {
    await AdMob.showInterstitial().catch((e) => console.log(e));

    this.isPrepareInterstitial = false;
  } */

  /**
   * ==================== /Interstitial ====================
   */
}
