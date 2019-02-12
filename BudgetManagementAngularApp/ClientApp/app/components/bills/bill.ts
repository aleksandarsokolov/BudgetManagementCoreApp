export interface IBill {
    billId: number;
    date: Date;
    memo: string;
    companyid: number;
    company: string;
    locationid: number;
    location: string;
    city: string;
    country: string;
    totalProducts: number;
    totalPrice: number;
    currency: string;
    utcTimeStamp: string;
    userId: number;
    lat: number;
    long: number;
    verified: boolean;
    products: any[];
}

//export class Bill {

//    public billId: number = 0;
//    public date: Date = new Date();
//    public memo: string = "";
//    public companyid: number = 0;
//    public company: string = "";
//    public locationid: number = 0;
//    public location: string = "";
//    public city: string = "";
//    public country: string = "";
//    public totalProducts: number = 0;
//    public totalPrice: number = 0;
//    public currency: string = "";
//    public utcTimeStamp: string = "";
//    public userId: number = 0;
//    public lat: number = 0;
//    public long: number = 0;
//    public verified: boolean = false;
//    public products!: any[]; 

//    // constructor(
//    //     public billId: number,
//    //     public date: string,
//    //     public memo: string,
//    //     public company: string,
//    //     public city: string,
//    //     public country: string,
//    //     public totalPrice: number,
//    //     public utcTimeStamp: string,
//    //     public userId: number,
//    //     public lat: number,
//    //     public long: number,
//    //     public verified: boolean,
//    //     public products: any[]
//    // ) {}

//    constructor() {
//        this.verified = false;
//        this.date = new Date();
//    }
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

    constructor() {
        this.ProductTypeID = 0;
        this.TypeName = "";
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

    constructor() {
        this.BillID = 0;
        this.Date = new Date();
        this.DateEntered = new Date();
        this.Memo = "";
        this.Company = new Company();
        this.Products = [];
        this.isVerified = false;
        this.TotalAmount = 0;
        this.TotalCount = 0;
    }
}

export interface IBill1 {
    BillID: number;
    Date: Date;
    DateEntered: Date;
    Memo: string;
    Company: Company;
    Products: Product[];
    isVerified: boolean;
    TotalAmount: number;
    TotalCount: number;
    Categories: string;
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

