import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BillService } from './bill.service';
import { ProductService } from './product.service';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [
    BillService,
    ProductService
  ]
})
export class DataModule { }
