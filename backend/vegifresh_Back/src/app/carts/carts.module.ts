import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartsRoutingModule } from './carts-routing.module';
import { CartsComponent } from './carts.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from '../dashboard/angular-material/angular-material.module';


@NgModule({
  declarations: [CartsComponent],
  imports: [
    CommonModule,
    CartsRoutingModule,
    HttpClientModule,
    AngularMaterialModule
  ]
})
export class CartsModule { }
