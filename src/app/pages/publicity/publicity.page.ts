import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PublicityService } from 'src/app/services/publicity.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publicity',
  templateUrl: './publicity.page.html',
  styleUrls: ['./publicity.page.scss'],
})
export class PublicityPage implements OnInit {
  @ViewChild('videoPublicity', { static: true })
  videoPublicity: ElementRef<any> | null = null;
  dataMedia: any = {};
  /* videoPlayer: any; */
  typeImg = ['.png', '.jpg', '.jpge'];
  constructor(
    private publicity: PublicityService,
    public sanitizer: DomSanitizer,
    public modalController: ModalController,
    private router: Router
  ) {}

  async ngOnInit() {
    this.randomPublicity();
  }

  randomPublicity() {
    this.publicity.getPublicityRandom().subscribe(
      (data) => {
        this.dataMedia = data;
        console.log(this.videoPublicity);
        if (this.typeImg.includes(this.dataMedia.tipo)) {
          setTimeout(() => this.modalController.dismiss(), 10000);
        }
        // this.toggleVideo();
        //this.videoPublicity.nativeElement.onended = () => this.endVideo();
        /*  this.play(`data:video/${this.dataMedia.tipo};base64,` + this.dataMedia.dataB)
        .then((video) => {
          console.log('video completed', video);
        })
        .catch((err) => {
          console.log(err);
        }); */
      },
      () => {
        this.modalController.dismiss();
        this.router.navigate(['/games']);
      }
    );
  }
  playing(event) {
    console.log(event);
    setTimeout(() => this.endVideo(23), event.duration * 1000);
  }
  endVideo(event) {
    console.log('video fin', event);
    this.modalController.dismiss();
  }
}
