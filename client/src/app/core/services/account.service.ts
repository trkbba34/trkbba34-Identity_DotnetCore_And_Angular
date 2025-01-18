import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, map, of, take } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../shared/models/account/user';
import { SharedService } from './shared.service';
import { Login } from '../../shared/models/account/login';
import { Register } from '../../shared/models/account/register';
import { ConfirmEmail } from '../../shared/models/account/confirmEmail';
import { ResetPassword } from '../../shared/models/account/resetPassword';
import { RegisterWithExternal } from '../../shared/models/account/registerWithExternal';
import { LoginWithExternal } from '../../shared/models/account/loginWithExternal';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private userSource = new ReplaySubject<User | null>(1);
  user$ = this.userSource.asObservable();

  refreshTokenTimeout: any;
  timeoutId: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private sharedService: SharedService
  ) {}

  refreshToken = async () => {
    this.http
      .post<User>(
        `${environment.apiUrl}account/refresh-token`,
        {},
        { withCredentials: true }
      )
      .subscribe({
        next: (user: User) => {
          if (user) {
            this.setUser(user);
          }
        },
        error: (error) => {
          this.sharedService.showNotification(false, 'Error', error.error);
          this.logout();
        },
      });
  };

  refreshUser(jwt: string | null) {
    if (jwt === null) {
      this.userSource.next(null);
      return of(undefined);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + jwt);

    return this.http
      .get<User>(`${environment.apiUrl}account/refresh-page`, {
        headers,
        withCredentials: true,
      })
      .pipe(
        map((user: User) => {
          if (user) {
            this.setUser(user);
          }
        })
      );
  }

  login(model: Login) {
    return this.http
      .post<User>(`${environment.apiUrl}account/login`, model, {
        withCredentials: true,
      })
      .pipe(
        map((user: User) => {
          if (user) {
            this.setUser(user);
          }
        })
      );
  }

  loginWithThirdParty(model: LoginWithExternal) {
    return this.http
      .post<User>(
        `${environment.apiUrl}account/login-with-third-party`,
        model,
        { withCredentials: true }
      )
      .pipe(
        map((user: User) => {
          if (user) {
            this.setUser(user);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem(environment.userKey);
    this.userSource.next(null);
    this.router.navigateByUrl('/');
    this.stopRefreshTokenTimer();
  }

  register(model: Register) {
    return this.http.post(`${environment.apiUrl}account/register`, model);
  }

  confirmEmail(model: ConfirmEmail) {
    return this.http.put(`${environment.apiUrl}account/confirm-email`, model);
  }

  resendEmailConfirmationLink(email: string) {
    return this.http.post(
      `${environment.apiUrl}account/resend-email-confirmation-link/${email}`,
      {}
    );
  }

  forgotUsernameOrPassword(email: string) {
    return this.http.post(
      `${environment.apiUrl}account/forgot-username-or-password/${email}`,
      {}
    );
  }

  resetPassword(model: ResetPassword) {
    return this.http.put(`${environment.apiUrl}account/reset-password`, model);
  }

  registerWithThirdParty(model: RegisterWithExternal) {
    return this.http
      .post<User>(
        `${environment.apiUrl}account/register-with-third-party`,
        model
      )
      .pipe(
        map((user: User) => {
          if (user) {
            this.setUser(user);
          }
        })
      );
  }

  getJWT() {
    const key = localStorage.getItem(environment.userKey);
    if (key) {
      const user: User = JSON.parse(key);
      return user.jwt;
    } else {
      return null;
    }
  }

  checkUserIdleTimout() {
    this.user$.pipe(take(1)).subscribe({
      next: (user: User | null) => {
        // the user is logged in
        if (user) {
        }
      },
    });
  }

  private setUser(user: User) {
    this.stopRefreshTokenTimer();
    this.startRefreshTokenTimer(user.jwt);
    localStorage.setItem(environment.userKey, JSON.stringify(user));
    this.userSource.next(user);

    this.checkUserIdleTimout();
  }

  private startRefreshTokenTimer(jwt: string) {
    const decodedToken: any = jwtDecode(jwt);
    // expires in seconds
    const expires = new Date(decodedToken.exp * 1000);
    // 30 seconds before the expiration
    const timeout = expires.getTime() - Date.now() - 30 * 1000;
    this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
