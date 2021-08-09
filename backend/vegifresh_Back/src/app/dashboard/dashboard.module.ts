import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LogoComponent } from './logo/logo.component';
import { LogoCreateComponent } from './logo-create/logo-create.component';
import { TopbarCreateComponent } from './topbar-create/topbar-create.component';
import { AuthGuard } from '../auth.guard';
import { SlidesComponent } from './slides/slides.component';
import { SlideCreateComponent } from './slide-create/slide-create.component';

@NgModule({
  declarations: [
    DashboardComponent,
    TopBarComponent,
    LogoComponent,
    LogoCreateComponent,
    TopbarCreateComponent,
    SlidesComponent,
    SlideCreateComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
  ],
  providers:[AuthGuard]
})
export class DashboardModule {}
