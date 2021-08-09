import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  isLoading=false;
  constructor(private authService: AuthServiceService,private router:Router) { }
  authStatusSub:Subscription;
  ngOnInit(): void {
    if (this.authService.getAuth()) {
      this.router.navigate(["dashboard"])
    }
    this.authStatusSub=this.authService.getAuthStatusListener().subscribe((authStatus )=>{
      this.isLoading=false
    })
  }
  onSubmit(form: any) {
    if (form.invalid) {
      return
    }
    this.isLoading=true;
    this.authService.login(form.value.email,form.value.password)
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }
}
