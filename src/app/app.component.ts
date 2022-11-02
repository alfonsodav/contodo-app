import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Juegos', url: '/games' },
    { title: 'Premios', url: '/awards' },
    { title: 'Mis Premios', url: '/awards' },
    { title: 'Noticias', url: '/news' },
    { title: 'mi Perfil', url: '/user' },
  ];

  constructor() {}
}
