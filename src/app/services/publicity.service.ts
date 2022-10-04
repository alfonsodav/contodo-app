import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicityService {
  url = environment.api + 'api/Publicidad';
  constructor(private http: HttpClient) { }

  getPublicityList(): Observable<any>{
    return this.http.get(environment.api);
  }
  getPublicityRandom(): Observable<any>{
    return this.http.get(environment.api + 'api/GetPublicidadAleatorio');
  }
  getPublicity(id): Observable<any>{
    return this.http.get(this.url + '/' + id);
  }

  // api/GetPublicidadAleatorio
}
