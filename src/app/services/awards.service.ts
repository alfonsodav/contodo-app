import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AwardsService {
  url = environment.api + 'api/Premios';
  urlCanje = environment.api + 'api/Canjes';
  constructor(private auth: AuthService, private http: HttpClient) {
   }

  getList(): Observable<any>{
    return this.http.get(this.url);
  }
  getMyAwards(id): Observable<any>{
    return this.http.get(this.urlCanje + '?id_Gamer=' + id );
  }

  newTrade(user, award){
    // eslint-disable-next-line @typescript-eslint/naming-convention
    return this.http.post(this.urlCanje, {id_Premio_FK: award, id_Gamer_FK: user}).toPromise();
  }
}
