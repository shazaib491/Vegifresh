import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './dashboard/angular-material/angular-material.module';
import { AuthInterceptorInterceptor } from './auth-interceptor.interceptor';
import { AuthGuard } from './auth.guard';
import { WildCardComponent } from './wild-card/wild-card.component';
import { ErrorInterceptor } from './error.interceptor';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent, WildCardComponent, UserComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
  ],
  providers: [ AuthGuard,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true,
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:ErrorInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
