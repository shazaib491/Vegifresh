import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BackServiceProviderService } from 'src/app/services/back-service-provider.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private homeService: BackServiceProviderService
  ) {}
  private authStatusSub?: Subscription;

  ngOnInit(): void {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        // this.isLoading=false
      });
  }

  signinUser(form: NgForm) {
    this.authService.loginUser(form.value);
  }

  ngOnDestroy() {
    this.authStatusSub?.unsubscribe();
  }
}
