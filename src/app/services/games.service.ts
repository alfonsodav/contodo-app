import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { repeatWhen, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  url = environment.api + 'api/games';
  source = interval(30000);
  constructor(private auth: AuthService, private http: HttpClient) {}

  getList(): Promise<any> {
    return this.http.get(this.url).toPromise();
  }
  getPointGame(id, idGame) {
    return this.http
      .get(
        environment.api +
          `api/GetPuntajeJugador?id_Game=${idGame}&id_Gamer=${id}`
      )
      .pipe(repeatWhen(() => this.source));
  }
}
