//export interface IBill {
//    billId: number;
//    date: Date;
//    memo: string;
//    companyid: number;
//    company: string;
//    locationid: number;
//    location: string;
//    city: string;
//    country: string;
//    totalProducts: number;
//    totalPrice: number;
//    currency: string;
//    utcTimeStamp: string;
//    userId: number;
//    lat: number;
//    long: number;
//    verified: boolean;
//    products: any[];
//}


export class Location {
    public LocationID: number = 0;
    public City: string = "";
    public Country: string = "";
    public State: string = "";

    constructor() {
        this.LocationID = 0;
        this.City = "";
        this.Country = "";
        this.State = "";
    }
}

export class Company {
    public CompanyID: number = 0;
    public CompanyName: string = "";
    public Location: Location = new Location();

    constructor() {
        this.CompanyID = 0;
        this.CompanyName = "";
    }
}

export class ProductType {
    public ProductTypeID: number = 0;
    public TypeName: string = "";
    public Icon: string = "";

    constructor() {
        this.ProductTypeID = 0;
        this.TypeName = "";
        this.Icon = "";
    }
}

export class Product {
    public ProductID: number = 0;
    public BillID: number = 0;
    public ProductName: string = "";
    public ProductType: ProductType = new ProductType();
    public Brand: string = "";
    public Amount: number = 0;
    public isPlanned: boolean = false;
    public Price: number = 0;
}

export class Bill {

    public BillID: number = 0;
    public Date: Date = new Date();
    public DateEntered: Date = new Date();
    public Memo: string = "";
    public Company: Company = new Company();
    public Products: Product[] = [];
    public isVerified: boolean = false;
    public TotalAmount: number = 0;
    public TotalCount: number = 0;
    public Categories: ProductType[] = [];

    //constructor() {
    //    this.BillID = 0;
    //    this.Date = new Date();
    //    this.DateEntered = new Date();
    //    this.Memo = "";
    //    this.Company = new Company();
    //    this.Products = [];
    //    this.isVerified = false;
    //    this.TotalAmount = 0;
    //    this.TotalCount = 0;
    //    this.Categories = [];
    //};

    constructor(bill?: IBill) {
        this.BillID = bill && bill.BillID || 0;
        this.Date = bill && new Date(bill.Date) || new Date();
        this.DateEntered = bill && new Date(bill.DateEntered) || new Date();
        this.Memo = bill && bill.Memo || "";
        this.Company = bill && bill.Company || new Company();
        this.Products = bill && bill.Products || [];
        this.isVerified = bill && bill.isVerified || false;
        this.TotalAmount = bill && bill.TotalAmount || 0.00;
        this.TotalCount = bill && bill.TotalCount || 0;
        this.Categories = bill && bill.Categories || [];
    }
}

export interface IBill {
    BillID: number;
    Date: Date;
    DateEntered: Date;
    Memo: string;
    Company: ICompany;
    Products: IProduct[];
    isVerified: boolean;
    TotalAmount: number;
    TotalCount: number;
    Categories: IProductType[];
}

export interface ICompany {
    CompanyID: number;
    CompanyName: string;
    Location: ILocation;
}

export interface ILocation {
    LocationID: number;
    City: string;
    Country: string;
    State: string;
}


export interface IProduct {
    ProductID: number;
    BillID: number;
    ProductName: string;
    ProductType: IProductType;
    Brand: string;
    Amount: number;
    isPlanned: boolean;
    Price: number;
}

export interface IProductType {
    ProductTypeID: number;
    TypeName: string;
    Icon: string;
}
