import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/services/auth.service';
import { BackServiceProviderService } from './services/back-service-provider.service';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  userIsAuthenticated?: boolean = false;
  private authListenerSubs?: Subscription;
  constructor(
    private AuthService: AuthService,
    private homeService: BackServiceProviderService,
    private cartService: CartService
  ) {}
  ngOnInit() {
    this.userIsAuthenticated = this.AuthService.getIsAuth();
    this.authListenerSubs = this.AuthService.getAuthStatusListener().subscribe(
      (isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.cartService.cartCounter();
        // this.homeService.getAllcarts().subscribe((response) => {

        // });
      }
    );
    this.AuthService.autoAuthUser();
  }
  onLogout() {
    this.AuthService.logout();
  }
  ngOnDestroy() {
    this.authListenerSubs?.unsubscribe();
  }
}
