import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../data/product.service';
import { IBill, IProduct, IProductType, Product } from '../bills/bill';
import { BillService } from '../data/bill.service';
import { Totals } from '../shared/totals';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatAutocompleteTrigger } from '@angular/material';
// import { ProductService } from './product.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
    showPlanned: boolean = false;

    model = new Product();

    bill: IBill;
    products: IProduct[] = [];

    totals: Totals[] = [];
    totalCount: number = 0;

    //MatTable info
    dataSource = new MatTableDataSource<IProduct>([]);

    errorMessage: string = "";

    selection: any;
    displayColumns = ['isPlanned', 'ProductName', 'Brand', 'Amount', 'ProductType', 'Price', 'editProduct', 'deleteProduct'];

    constructor(private route: ActivatedRoute,
        private router: Router,
        private billService: BillService,
        private productService: ProductService) { }


    onBack(): void {
        this.router.navigate(['/bills']);
    }

    ngOnInit() {

        if (this.route.snapshot.paramMap.get('BillID') != null) {

            var BillID = <number>+this.route.snapshot.paramMap.get('BillID');

            this.billService.getBillByID(BillID).subscribe(
                bill => {
                    this.bill = bill;
                    this.dataSource = new MatTableDataSource<IProduct>(bill.Products);
                    this.selection = new SelectionModel<IProduct>(true, bill.Products.filter(prod => prod.isPlanned === true));
                    console.log(bill);

                    this.getTotalCost();
                    this.getTotalCount();
                },
                error => this.errorMessage = <any>error
            );


        }
    }


    showPlannedCheckboxes() {
        this.showPlanned = !this.showPlanned;
    }


    GetColor(verified: boolean): string {
        if (verified == true) return 'green'
        else return 'red';
    }

    GetThumb(isPlanned: boolean): string {
        if (isPlanned == true) return 'thumb_up'
        else return 'thumb_down';
    }



    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }



    getTotalCost() {
        var me = this;
        me.totals = new Array<Totals>();
        if (me.dataSource != undefined) {
            me.totals.push({ currency: '$', amount: 0.00 });

            me.totals[0].amount = me.totals[0].amount + this.bill.TotalAmount;
        }
    }

    getTotalCount() {
        this.totalCount = this.bill.TotalCount;
    }


    getDisplayedColumns(): string[] {
        if (this.showPlanned === true) {
            if (this.displayColumns.indexOf('verify-chk') == -1) {
                this.displayColumns.unshift('verify-chk');
            } else {
                this.displayColumns.shift();
            }
        }
        return this.displayColumns;
    }

    EditProduct(productid: number) {

    }

    DeleteProduct(productid: number) {

    }
}
