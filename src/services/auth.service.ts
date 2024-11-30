import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = environment.apiUrl;
  private loginEndpoint = '/login';
  private registerEndpoint = '/register';

  constructor(private http: HttpClient) {
  }

  //fixme
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + this.loginEndpoint, {email, password});
  }

  //fixme
  register(param: { password: any; phone: any; name: any; email: any }): Observable<any> {
    return this.http.post<any>(this.apiUrl + this.registerEndpoint, param);
  }
}
