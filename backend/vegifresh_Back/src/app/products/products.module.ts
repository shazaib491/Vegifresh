import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { AngularMaterialModule } from '../dashboard/angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [ProductsComponent, AddProductsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ProductsRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
  ]
})
export class ProductsModule { }
