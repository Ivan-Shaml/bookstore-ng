import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, map, Observable, Subscription, tap} from 'rxjs';
import {environment} from '../environments/environment.development';
import {User, UserAuthResponse, UserForLogin, UserForRegistration} from '../types/user';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private user$$ = new BehaviorSubject<User | null>(null);
  private user$ = this.user$$.asObservable();
  user: User | null = null;
  userSubscription: Subscription | null = null;

  apiUrl: string = environment.apiUrl;
  private readonly token_name = 'token';
  private readonly loginEndpoint = '/login';
  private readonly registerEndpoint = '/register';

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  login(body: UserForLogin): Observable<User> {
    return this.http.post<UserAuthResponse>(this.apiUrl + this.loginEndpoint, body)
      .pipe(tap((user) => this.user$$.next(user.user))).pipe(tap((user) => {
          this.user$$.next(user.user);
          this.setToken(user.accessToken)
        }),
        map((user) => {
          return user.user
        }));
  }

  register(body: UserForRegistration): Observable<User> {
    return this.http.post<UserAuthResponse>(this.apiUrl + this.registerEndpoint, this.addDefaultRoleToRequest(body))
      .pipe(tap((user) => {
          this.user$$.next(user.user);
          this.setToken(user.accessToken)
        }),
        map((user) => {
          return user.user;
        }));
  }

  /**
   * Няма как да го направя през json server-a, (или поне лесно и бързо) и ще си измия ръцете така...
   */
  private addDefaultRoleToRequest(user: UserForRegistration): any {
    return {email: user.email, name: user.name, phone: user.phone, password: user.password, role: 'user'};
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  private setToken(token: string): void {
    this.cookieService.set(this.token_name, token, {path: '/'});
  }

  getToken(): string | null {
    return this.cookieService.get(this.token_name);
  }

  logOut(): void {
    this.cookieService.delete(this.token_name, '/');
    this.router.navigate(['/login']);
  }

  get isLogged(): boolean {
    return !!this.user;
  }

  get isAdmin(): boolean {
    return this.user?.role == 'admin';
  }

  get username(): string {
    return this.user?.name || '';
  }
}
