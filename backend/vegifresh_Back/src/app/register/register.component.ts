import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthServiceService, private router:Router) {
    if (this.authService.getAuth()) {
      this.router.navigate(["dashboard"])
    }
  }

  ngOnInit(): void {}
  onSubmit(form: any) {
    if (form.invalid) {
      return;
    }
    this.authService.register(
      form.value.email,
      form.value.password,
      form.value.confirmpassword,
      form.value.mobile
    );
  }
}
