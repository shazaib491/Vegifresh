import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { BackServiceProviderService } from '../services/back-service-provider.service';
import { CartService } from '../services/cart.service';
import { logo } from './../interfaces/logo';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css'],
})
export class HeadersComponent implements OnInit {
  logo?: logo;
  userIsAuthenticated?: boolean = false;

  uname: any;
  cartCounter?: any;
  topbar?: any;

  private authListenerSubs?: Subscription;
  private cartSubcriptionListener?: Subscription;
  private logoSubscribtion?: Subscription;
  private headerSubscribtion?: Subscription;

  constructor(
    private header: BackServiceProviderService,
    private cart: CartService,
    private AuthService: AuthService
  ) {}

  ngOnInit(): void {
    // check Authetication
    this.userIsAuthenticated = this.AuthService.getIsAuth();
    this.authListenerSubs = this.AuthService.getAuthStatusListener().subscribe(
      (isAuthenticated: boolean | undefined) => {
        this.userIsAuthenticated = isAuthenticated;
      }
    );

    // setting  username
    this.AuthService.username.subscribe((name) => {
      this.uname = name;
    });

    // check token exist or not
    this.AuthService.autoAuthUser();

    // fetching logo information
    this.logoSubscribtion = this.header.logo().subscribe(
      (response: { message: string; logo: any }) => {
        this.logo = response.logo;
      },
      (error) => {
        console.log(error);
      }
    );

    // getting total Cart Detail
    this.cartSubcriptionListener = this.cart
      .totalCartEventListener()
      .subscribe((cartCounter) => {
        this.cartCounter = cartCounter.counter;
      });


  // fething header detail
    this.headerSubscribtion = this.header
      .header()
      .subscribe((response: { message: string; header: any }) => {
        this.topbar = response.header;
      });
  }

  //logout user
  onLogout() {
    this.AuthService.logout();
  }



  // destroy all activity when component exit
  ngOnDestroy() {
    this.authListenerSubs?.unsubscribe();
    this.cartSubcriptionListener?.unsubscribe();
    this.logoSubscribtion?.unsubscribe();
    this.headerSubscribtion?.unsubscribe();
  }
}
