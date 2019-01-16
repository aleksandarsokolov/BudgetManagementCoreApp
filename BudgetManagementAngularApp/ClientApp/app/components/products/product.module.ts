import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forChild([
      { path: 'bills/:id', component: ProductListComponent }
    ]),
  ],
  declarations: [
    ProductListComponent
  ]
})
export class ProductModule { }
