import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BillListComponent } from './bill-list.component';
import { DataModule } from '../data/data.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatAutocompleteModule,
  MatExpansionModule,
  MatTooltipModule,
  MatDividerModule,
  MatDatepickerModule, MatNativeDateModule,
  MatButtonModule, 
  MatInputModule, 
  MatFormFieldModule, 
  MatSlideToggleModule, 
  MatToolbarModule, 
  MatTableModule, 
  MatSortModule, 
  MatCheckboxModule, 
  MatCardModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    DataModule,
    RouterModule.forChild([
      { path: 'bills', component: BillListComponent }
    ]),
    SharedModule, BrowserAnimationsModule,
    MatCardModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatTooltipModule,
    MatDividerModule,
    MatDatepickerModule, MatNativeDateModule, 
    MatButtonModule, 
    MatInputModule, 
    MatFormFieldModule, 
    MatSlideToggleModule, 
    MatToolbarModule, 
    MatIconModule, 
    MatTableModule, 
    MatSortModule, 
    MatCheckboxModule,
    FlexLayoutModule
  ],
  declarations: [
    BillListComponent
  ]
})
export class BillModule { }
