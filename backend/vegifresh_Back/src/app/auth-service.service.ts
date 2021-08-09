import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

export interface authData {
  email: string;
  password: string;
  confirmPassword?: string;
  mobile?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private ROOT_URL = 'http://localhost:3000/auth';
  private  token: any;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated:boolean;
  isTimer: any;
  private userId: any;

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }
  getAuth(){
    return this.isAuthenticated;
  }
  getUserId() {
    return this.userId;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  register(email: string, password: string, cpassword: string, mobile: string) {
    const authData: authData = {
      email: email,
      password: password,
      confirmPassword: cpassword,
      mobile: mobile,
    };
    return this.http.post(`${this.ROOT_URL}/signup`, authData).subscribe(
      (response) => {
        this.router.navigate(['']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  login(email: string, password: string) {
    const authData: authData = {
      email: email,
      password: password,
    };
    return this.http
      .post<{ token: any; expiresIn: number; userId: string }>(
        `${this.ROOT_URL}/signin`,
        authData
      )
      .subscribe(
        (response) => {
          this.token = response.token;
          if (this.token) {
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + response.expiresIn * 1000
            );
            this.setAuthTimer(response.expiresIn);
            this.saveAuthData(this.token, expirationDate, this.userId);
            this.router.navigate(['dashboard']);
          }
        },
        (error) => {
          this.authStatusListener.next(false);
        }
      );
  }

  authAuthUSer() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expiresDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expiresDate=localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token && !expiresDate) {
      return;
    }
    return {
      token: token,
      expiresDate:new Date(expiresDate),
      userId: userId,
    };
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
    this.userId = null;
    this.clearAuthData();
    clearTimeout(this.isTimer);
  }

  setAuthTimer(duration: number) {
    this.isTimer = setTimeout(() => {
      this.logout()
    }, duration * 1000);
  }
}
