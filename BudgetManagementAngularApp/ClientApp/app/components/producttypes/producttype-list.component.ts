import { Component, OnInit, ViewChild, Injectable  } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import * as $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
import { IBill, IProduct, IProductType, Product, ProductType } from '../bills/bill';
import { ProductTypeService } from '../data/producttype.service';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MatSidenavModule } from '@angular/material/sidenav';
//import { ResizeEvent } from 'angular-resizable-element';
import 'hammerjs';



interface ExampleFlatNode {
    expandable: boolean;
    producttypeid: number;
    name: string;
    icon: string;
    level: number;
}

@Component({
    selector: 'app-producttype-list',
    templateUrl: './producttype-list.component.html',
    styleUrls: ['./producttype-list.component.css']
})

export class ProductTypeListComponent implements OnInit {
    errorMessage: string = "";

    model = new ProductType();

    productTypes: IProductType[] = [];
    optionsProductTypeNames: string[] = [];

    private _transformer = (node: IProductType, level: number) => {
        return {
            expandable: !!node.ChildProductTypes && node.ChildProductTypes.length > 0,
            producttypeid: node.ProductTypeID,
            name: node.TypeName,
            icon: node.Icon,
            level: level,
        };
    }

    treeControl = new FlatTreeControl<ExampleFlatNode>(
        node => node.level, node => node.expandable);

    treeFlattener = new MatTreeFlattener(
        this._transformer, node => node.level, node => node.expandable, node => node.ChildProductTypes);

    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private productTypeService: ProductTypeService) {

    }

    ngOnInit() {
        this.GetProductTypes();



        $(document).ready(function () {
            // Document ready jquery script

        });
    }

    GetProductTypes() {
        this.productTypeService.getProductTypes().subscribe(
            results => {
                this.productTypes = results;

                this.dataSource.data = results;

                console.log(results);
                this.optionsProductTypeNames = results.map(producttype => producttype.TypeName).sort();
            },
            error => this.errorMessage = <any>error
        );
    }

    AddNewProductType(producttypeid: number) {
        this.model = new ProductType();
        this.model.ParentTypeID = producttypeid;
        //drawer.open();
    }

    EditProductType(producttypeid: number) {
        let prodType: IProductType[];
        prodType = this.productTypes.filter(prodtyp => prodtyp.ProductTypeID == producttypeid);
        if (prodType.length != 0) {
            this.model = prodType[0];
        }
    }
}