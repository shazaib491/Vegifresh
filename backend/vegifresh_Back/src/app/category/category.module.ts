import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AngularMaterialModule } from '../dashboard/angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CategoryComponent, AddCategoryComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ]
})
export class CategoryModule { }
