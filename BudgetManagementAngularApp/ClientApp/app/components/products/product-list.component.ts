import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IBill, IProduct, IProductType, Product, ProductType } from '../bills/bill';
import { BillService } from '../data/bill.service';
import { Totals } from '../shared/totals';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatAutocompleteTrigger } from '@angular/material';
import * as $ from 'jquery';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ProductService } from '../data/product.service';
// import { ProductService } from './product.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
    showPlanned: boolean = false;
    btnAddSaveName: string = "Add";
    showAddNew: boolean = true;
    errorMessage: string = "";

    model = new Product();

    bill: IBill;
    products: IProduct[] = [];

    totals: Totals[] = [];
    totalCount: number = 0;

    // auto complete option
    autoCompleteProducts: IProduct[] = [];

    productFormGroup: FormGroup;
    brandFormGroup: FormGroup;
    productTypeFormGroup: FormGroup;

    //MatTable info
    dataSource = new MatTableDataSource<IProduct>([]);

    optionsProductNames: string[] = [];
    filteredProductNames!: Observable<string[]>;

    optionsBrands: string[] = [];
    filteredBrands!: Observable<string[]>;

    optionsProductTypeNames: string[] = [];
    filteredProductTypeNames!: Observable<string[]>;

    selection: any;
    displayColumns = ['isPlanned', 'ProductName', 'Brand', 'Amount', 'ProductType', 'Price', 'editProduct', 'deleteProduct'];
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private billService: BillService,
        private productService: ProductService,
        private _formBuilder: FormBuilder) {

        this.productFormGroup = this._formBuilder.group({
            productname: new FormControl()
        });

        this.brandFormGroup = this._formBuilder.group({
            brand: new FormControl()
        });

        this.productTypeFormGroup = this._formBuilder.group({
            producttypename: new FormControl()
        });
    }


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

                    this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string | number => {
                        let value = null;
                        switch (sortHeaderId) {
                            case 'ProductType':
                                value = data.ProductType.TypeName;
                                break;
                            default:
                                value = data[sortHeaderId];
                        }
                        return this._isNumberValue(value) ? Number(value) : value;
                    };

                    this.dataSource.sort = this.sort;

                    this.getTotalCost();
                    this.getTotalCount();
                },
                error => this.errorMessage = <any>error
            );
            
        }

        this.GetProductBrands();
        this.GetProductTypes();

        //Product Names Autocomplete
        this.filteredProductNames = this.productFormGroup.controls.productname.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value, this.optionsProductNames))
            );

        //Brands Autocomplete
        this.filteredBrands = this.brandFormGroup.controls.brand.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value, this.optionsBrands))
        );

        //Product Types Autocomplete
        this.filteredProductTypeNames = this.productTypeFormGroup.controls.producttypename.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value, this.optionsProductTypeNames))
            );

        $(document).ready(function () {
            // Document ready jquery script
        });

    }

    _isNumberValue(value: any): boolean {
        // parseFloat(value) handles most of the cases we're interested in (it treats null, empty string,
        // and other non-number values as NaN, where Number just uses 0) but it considers the string
        // '123hello' to be a valid number. Therefore we also check if Number(value) is NaN.
        return !isNaN(parseFloat(value as any)) && !isNaN(Number(value));
    }

    //Autocomplete
    private _filter(value: string, lisToFilter: string[]): string[] {
        const filterValue = value.toLowerCase();

        return lisToFilter.filter(option => option.toLowerCase().includes(filterValue));
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

        var tempBill = new Product(this.bill.Products.find(prod => prod.ProductID == productid));
        this.model = tempBill;

        this.btnAddSaveName = "Save";
    }

    DeleteProduct(productid: number) {

    }
    ClearModel() {
        this.model = new Product();
        this.btnAddSaveName = "Add";
    }

    GetProductBrands() {
        this.productService.getProductBrands().subscribe(
            results => {
                this.optionsBrands = results;
            },
            error => this.errorMessage = <any>error
        );
    }

    GetProductTypes() {
        this.productService.getProductTypes().subscribe(
            results => {
                this.optionsProductTypeNames = results.map(producttype => producttype.TypeName).sort();
            },
            error => this.errorMessage = <any>error
        );
    }
}
