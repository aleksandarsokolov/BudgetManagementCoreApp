import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IBill, Bill, ICompany, Company, ILocation } from './bill';
import { BillService } from '../data/bill.service';
import { Totals } from '../shared/totals';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatAutocompleteTrigger } from '@angular/material';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as $ from 'jquery';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CompanyService } from '../data/company.service';
// import { BillService } from './bill.service';

@Component({
    selector: 'app-bill-list',
    templateUrl: './bill-list.component.html',
    styleUrls: ['./bill-list.component.css']
})

export class BillListComponent implements OnInit {
    pageTitle: string = 'Bills List';
    showVerify: boolean = false;
    showAddNew: boolean = true;
    errorMessage: string = "";

    firstDate: Date;
    lastDate: Date;
    startDate: FormControl;
    endDate: FormControl;

    btnAddSaveName: string = "Add";

    model = new Bill();

    bills: IBill[] = [];
    companies: ICompany[] = [];

    totals: Totals[] = [];
    totalCount: number = 0;

    // auto complete option
    companyFormGroup: FormGroup;

    locationFormGroup: FormGroup;

    //MatTable info
    dataSource = new MatTableDataSource<IBill>([]);

    optionsCompanies: string[] = [];
    filteredCompanies!: Observable<string[]>;

    optionsLocations: string[] = [];
    filteredLocations!: Observable<string[]>;

    selection: any;
    displayColumns = ['isVerified', 'Date', 'Memo', 'Company', 'Location', 'Categories', 'TotalCount', 'TotalAmount', 'editBill', 'deleteBill', 'openBill'];
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private billService: BillService,
        private companyService: CompanyService,
        private _formBuilder: FormBuilder) {

        this.companyFormGroup = this._formBuilder.group({
            company: new FormControl()
        });

        this.locationFormGroup = this._formBuilder.group({
            location: new FormControl()
        });
    }

    ngOnInit() {

        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        this.firstDate = new Date(y, m, 1);
        this.lastDate = new Date(y, m + 1, 0);

        this.startDate = new FormControl(this.firstDate);
        this.endDate = new FormControl(this.lastDate);

        this.GetBills(this.firstDate, this.lastDate);

        this.GetCompanies();


        //Companies Autocomplete
        this.filteredCompanies = this.companyFormGroup.controls.company.valueChanges
            .pipe(
                startWith(''),
            map(value => this._filter(value, this.optionsCompanies))
        );

        //Locations Autocomplete
        this.filteredLocations = this.locationFormGroup.controls.location.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value, this.optionsLocations))
            );

        $(document).ready(function () {
            // Document ready jquery script
        });
    }

    setFirstDate(event: MatDatepickerInputEvent<Date>) {
        this.firstDate = event.value;
        console.log(`Start Date: ${event.value}`);
        this.GetBills(this.firstDate, this.lastDate);
    }
    setLastDate(event: MatDatepickerInputEvent<Date>) {
        this.lastDate = event.value;
        console.log(`End Date: ${event.value}`);
        this.GetBills(this.firstDate, this.lastDate);
    }

    //Companies Autocomplete
    private _filter(value: string, lisToFilter: string[]): string[] {
        const filterValue = value.toLowerCase();

        return lisToFilter.filter(option => option.toLowerCase().includes(filterValue));
    }

    showVerifyCheckboxes() {
        this.showVerify = !this.showVerify;
    }

    GetColor(verified: boolean): string {
        if (verified == true) return 'green'
        else return 'red';
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        this.getTotalCost();
        this.getTotalCount();
        //console.log("Filtered List: " + JSON.stringify(this.dataSource);
    }

    
    _isNumberValue(value: any): boolean {
        // parseFloat(value) handles most of the cases we're interested in (it treats null, empty string,
        // and other non-number values as NaN, where Number just uses 0) but it considers the string
        // '123hello' to be a valid number. Therefore we also check if Number(value) is NaN.
        return !isNaN(parseFloat(value as any)) && !isNaN(Number(value));
    }


    getTotalCost() {
        var me = this;
        me.totals = new Array<Totals>();
        if (me.dataSource != undefined) {
            me.totals.push({ currency: '$', amount: 0.00 });

            me.dataSource.filteredData.forEach(function (elem) {
                /* 
                let index = -1;

                if (me.totals.length != 0) {
                    index = me.totals.findIndex(e => e.currency === elem.currency);
                }

                if (index != -1) {
                    me.totals[index].amount = me.totals[index].amount + elem.TotalAmount;
                } else {
                    me.totals.push({ currency: '$', amount: elem.TotalAmount });
                }
                */

                me.totals[0].amount = me.totals[0].amount + elem.TotalAmount;
            });

        }
    }

    getTotalCount() {
        if (this.dataSource.filteredData != undefined) {
            this.totalCount = this.dataSource.filteredData.map(t => t.TotalCount).reduce((acc, value) => acc + value, 0);
        } else {
            this.totalCount = this.bills.map(t => t.TotalCount).reduce((acc, value) => acc + value, 0);
        }
    }

    getDisplayedColumns(): string[] {
        if (this.showVerify === true) {
            if (this.displayColumns.indexOf('verify-chk') == -1) {
                this.displayColumns.unshift('verify-chk');
            } else {
                this.displayColumns.shift();
            }
        }
        return this.displayColumns;
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

    GetBills(startDate: Date, endDate: Date) {

        console.log(`GetBills with Start Date: ${startDate} and End Date: ${endDate}`);

        this.billService.getBills(startDate, endDate).subscribe(
            bills => {
                this.bills = bills;
                this.dataSource = new MatTableDataSource<IBill>(bills);
                this.selection = new SelectionModel<IBill>(true, bills.filter(bill => bill.isVerified === true));

                this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string | number => {
                    let value = null;
                    switch (sortHeaderId) {
                        case 'Company':
                            value = data.Company.CompanyName;
                            break;
                        case 'Location':
                            value = data.Company.Location.City;
                            break;
                        default:
                            value = data[sortHeaderId];
                    }
                    return this._isNumberValue(value) ? Number(value) : value;
                };

                this.dataSource.filterPredicate = (data, filter) => {
                    const dataStr = data.Memo
                        + data.Company.CompanyName
                        + data.Company.Location.City
                        + data.Company.Location.Country
                        + data.TotalCount
                        + data.TotalAmount
                        + data.Categories.map(category => category.TypeName).join(',');
                    return dataStr.toLowerCase().indexOf(filter) != -1;
                }

                this.dataSource.sort = this.sort;
                this.getTotalCost();
                this.getTotalCount();
            },
            error => this.errorMessage = <any>error
        );
    }

    GetCompanies() {

        this.companyService.getCompanies().subscribe(
            results => {
                this.companies = results;
                this.optionsCompanies = results.map(company => company.CompanyName)
                    .filter(function (elem, index, self) {
                        return index === self.indexOf(elem);
                    }).sort();
                this.optionsLocations = results.map(company => company.Location.City)
                    .filter(function (elem, index, self) {
                        return index === self.indexOf(elem);
                    }).sort();
            },
            error => this.errorMessage = <any>error
        );
    }

    AddSaveBill() {

        if (this.model.Company.CompanyID == 0) {
            let comp: ICompany[];
            comp = this.companies.filter(comp => comp.CompanyName == this.model.Company.CompanyName);
            if (comp.length != 0) {
                this.model.Company.CompanyID = comp[0].CompanyID;
            }

            comp = this.companies.filter(comp => comp.Location.City == this.model.Company.Location.City);
            if (comp.length != 0) {
                this.model.Company.Location.LocationID = comp[0].Location.LocationID;
            }
     
        }

        this.billService.saveBill(this.model).subscribe((creationstatus) => {
            // do necessary staff with creation status
            console.log(creationstatus);
            this.ClearModel();
            this.GetBills(this.firstDate, this.lastDate);
            this.GetCompanies();
        }, (error) => {
            // handle the error here
            console.log(error);
        });
    }

    EditBill(billid: number) {

        var tempBill = new Bill(this.bills.find(bill => bill.BillID == billid));

        var d = new Date(tempBill.Date);
        d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
        tempBill.Date = d;


        this.model = tempBill;
        this.btnAddSaveName = "Save";
    }

    DeleteBill(billid: number) {

        this.billService.deleteBill(billid).subscribe((creationstatus) => {
            // do necessary staff with creation status
            console.log(creationstatus);
            this.GetBills(this.firstDate, this.lastDate);
            this.GetCompanies();
        }, (error) => {
            // handle the error here
            console.log(error);
        });


    }
    ClearModel() {
        this.model = new Bill();
        this.btnAddSaveName = "Add";
    }
}
