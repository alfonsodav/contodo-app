import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss'],
})
export class RulesComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  constructor() {}

  ngOnInit() {}
  confirm() {
    this.modal.dismiss('confirm');
  }
}
