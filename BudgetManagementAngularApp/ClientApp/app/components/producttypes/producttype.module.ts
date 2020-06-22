import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ProductTypeListComponent } from './producttype-list.component';
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
    MatCardModule,
    MatTreeModule
} from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
//import { ResizableModule } from 'angular-resizable-element';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule, ReactiveFormsModule,
        DataModule,
        RouterModule.forChild([
            { path: 'producttypes', component: ProductTypeListComponent }
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
        MatSidenavModule,
        MatTreeModule,
        //ResizableModule,
        FlexLayoutModule
    ],
    declarations: [
        ProductTypeListComponent
    ]
})
export class ProductTypeModule { }
