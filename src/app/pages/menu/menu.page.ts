import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  public appPages = [
    { title: 'Juegos', url: '/games' },
    { title: 'Premios', url: '/awards' },
    { title: 'Mis Premios', url: '/my-awards' },
    { title: 'Noticias', url: '/news' },
    { title: 'Mi perfil', url: '/user' },
  ];
  constructor() { }

  ngOnInit() {
  }

}
