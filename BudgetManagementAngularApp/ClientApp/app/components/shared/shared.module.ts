import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConvertToIconComponent } from './convert-to-icon.component';
import { ShowTotalsComponent } from './show-totals.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule    
  ],
  declarations: [
    ConvertToIconComponent,
    ShowTotalsComponent
  ],
  exports: [
    ConvertToIconComponent,
    ShowTotalsComponent
  ]
})
export class SharedModule { }
