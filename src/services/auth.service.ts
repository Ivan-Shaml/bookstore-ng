import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, catchError, map, Observable, of, Subscription, tap} from 'rxjs';
import {environment} from '../environments/environment.development';
import {User, UserAuthResponse, UserForLogin, UserForRegistration} from '../types/user';
import {Router} from '@angular/router';
import {TOKEN_NAME} from '../common/constants';
import {jwtDecode} from 'jwt-decode';
import {JwtUserToken} from '../types/jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private user$$ = new BehaviorSubject<User | null>(null);
  private user$ = this.user$$.asObservable();
  user: User | null = null;
  userSubscription: Subscription | null = null;

  apiUrl: string = environment.apiUrl;
  private readonly loginEndpoint = '/login';
  private readonly registerEndpoint = '/register';

  constructor(private http: HttpClient, private router: Router) {
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
    localStorage.setItem(TOKEN_NAME, token);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_NAME)
  }

  logOut(): void {
    localStorage.removeItem(TOKEN_NAME);
    this.user$$.next(null);
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

  get userid(): number | null {
    return this.user?.id || null;
  }

  private parseToken(): Observable<void> {
    const token: string | null = localStorage.getItem(TOKEN_NAME);
    if (!token) {
      return of(void 0);
    }

    const decodedToken: JwtUserToken | null = this.decodeToken(token);
    if (!decodedToken) {
      return of(void 0);
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const isValid = decodedToken.exp && decodedToken.exp > currentTime;
    const sub = decodedToken.sub;

    if (isValid && !this.isLogged && sub) {
      return this.http.get<User>(this.apiUrl + `/users/${sub}`).pipe(
        tap(user => this.user$$.next(user)),
        map(() => void 0),
        catchError(() => {
          localStorage.removeItem(TOKEN_NAME);
          return of(void 0);
        }));
    } else {
      localStorage.removeItem(TOKEN_NAME);
    }

    return of(void 0);
  }

  private decodeToken(token: string): JwtUserToken | null {
    try {
      return jwtDecode<JwtUserToken>(token);
    } catch (Error) {
      return null;
    }
  }

  init(): Observable<void> {
    return this.parseToken();
  }
}
