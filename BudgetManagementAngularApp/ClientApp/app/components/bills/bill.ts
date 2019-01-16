export interface IBill {
    billId: number;
    date: Date;
    memo: string;
    company: string;
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

export class Bill {

    public billId: number = 0;
    public date: Date = new Date();
    public memo: string = "";
    public company: string = "";
    public location: string = "";
    public city: string = "";
    public country: string = "";
    public totalProducts: number = 0;
    public totalPrice: number = 0;
    public currency: string = "";
    public utcTimeStamp: string = "";
    public userId: number = 0;
    public lat: number = 0;
    public long: number = 0;
    public verified: boolean = false;
    public products!: any[]; 

    // constructor(
    //     public billId: number,
    //     public date: string,
    //     public memo: string,
    //     public company: string,
    //     public city: string,
    //     public country: string,
    //     public totalPrice: number,
    //     public utcTimeStamp: string,
    //     public userId: number,
    //     public lat: number,
    //     public long: number,
    //     public verified: boolean,
    //     public products: any[]
    // ) {}

    constructor() {
        this.verified = false;
        this.date = new Date();
    }
}
