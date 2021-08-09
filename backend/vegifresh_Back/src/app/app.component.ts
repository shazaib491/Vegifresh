import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  panelOpenState = false;

  userIsAutheticated: boolean;
  isAuthenticated: boolean;
  private authStatusSub: Subscription;
  constructor(private authService: AuthServiceService) {}

  ngOnInit() {
    this.authService.authAuthUSer();
    this.userIsAutheticated = this.authService.getAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.userIsAutheticated = authStatus;
      });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
