import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Signin, Signup } from 'src/app/interfaces/authData';
import { BackServiceProviderService } from 'src/app/services/back-service-provider.service';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token?: any;
  isAuthenticated?: boolean = false;
  userId?: any;
  isTimer: any;
  uname?: any;
  private authStatusListner = new Subject<boolean>();
  username = new Subject<{ uname: any }>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private homeService: BackServiceProviderService,
    private cartService:CartService
  ) {}
  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }
  getUserId() {
    return this.userId;
  }
  getAuthStatusListener() {
    return this.authStatusListner.asObservable();
  }

  getUserStatusListener(){
    return this.username.asObservable();

  }
  createUser(users: Signup) {
    this.http.post(`${environment.authUrl}/signup`, users).subscribe(
      (success) => {
        this.router.navigate(['/']);
        console.log(success);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loginUser(authData: Signin) {
    this.http
      .post<{
        token: string;
        expiresIn: number;
        userId: SVGStringList;
        uname: string;
      }>(`${environment.authUrl}/signin`, authData)
      .subscribe(
        (response) => {
          this.token = response.token;
          if (this.token) {
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.uname = response.uname;
            this.authStatusListner.next(true);
            this.username.next(this.uname);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + response.expiresIn * 1000
            );
            this.setAuthTimer(response.expiresIn);
            this.saveAuthData(
              this.token,
              expirationDate,
              this.userId,
              this.uname
            );
            this.router.navigate(['/']);
          }
        },
        (error) => {
          this.authStatusListner.next(false);
        }
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation!.expiresDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation?.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.uname = authInformation.uname;
      this.username.next(this.uname);
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListner.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListner.next(false);
    this.cartService.totalCart.next({ counter: 0 });
    this.router.navigate(['/']);
    this.userId = null;
    this.clearAuthData();
    clearTimeout(this.isTimer);
  }

  setAuthTimer(duration: number) {
    // console.log('Seting Timer :', +duration);
    this.isTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(
    token: string,
    expirationDate: Date,
    userId: string,
    uname: string
  ) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('uname', uname);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('uname');
    localStorage.removeItem('TotalCount');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expiresDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const uname = localStorage.getItem('uname');
    if (!token && !expiresDate) {
      return;
    }
    return {
      token: token,
      expiresDate: new Date(expiresDate || ''),
      userId: userId,
      uname: uname,
    };
  }
}
