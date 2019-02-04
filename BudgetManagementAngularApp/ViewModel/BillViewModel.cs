using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetManagementAngularApp.ViewModel
{
    public class BillViewModel
    {


        //        public billId: number = 0;
        //public date: Date = new Date();
        //        public memo: string = "";
        //public companyid: number = 0;
        //public company: string = "";
        //public locationid: number = 0;
        //public location: string = "";
        //public city: string = "";
        //public country: string = "";
        //public totalProducts: number = 0;
        //public totalPrice: number = 0;
        //public currency: string = "";
        //public utcTimeStamp: string = "";
        //public userId: number = 0;
        //public lat: number = 0;
        //public long: number = 0;
        //public verified: boolean = false;
        //public products!: any[]; 

        public int BillID { get; set; }
        public string Date { get; set; }
        public string DateEntered { get; set; }
        public string Memo { get; set; }
        public CompanyViewModel Company { get; set; }
        public List<ProductViewModel> Products { get; set; }
        public bool isVerified { get; set; }
        public decimal? TotalAmount { get; set; }
        public decimal TotalCount { get; set; }
    }
}
