import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { DashboardComponent } from './dashboard.component';
import { LogoCreateComponent } from './logo-create/logo-create.component';
import { LogoComponent } from './logo/logo.component';
import { SlideCreateComponent } from './slide-create/slide-create.component';
import { SlidesComponent } from './slides/slides.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { TopbarCreateComponent } from './topbar-create/topbar-create.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    // redirectTo: 'dashboard',
    // pathMatch: 'full',
  },
  { path: 'topbar', component: TopBarComponent, canActivate: [AuthGuard] },
  {
    path: 'topbar-create',
    component: TopbarCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'topbar-edit/:id',
    component: TopbarCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'logo-create',
    component: LogoCreateComponent,
    canActivate: [AuthGuard],
  },
  { path: 'logo-list', component: LogoComponent, canActivate: [AuthGuard] },
  {
    path: 'logo-edit/:id',
    component: LogoCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'slides-create',
    component: SlideCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'slides-list',
    component: SlidesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'slides-edit/:id',
    component: SlideCreateComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class DashboardRoutingModule {}
