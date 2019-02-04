using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetManagementAngularApp.ViewModel
{
    public class ProductViewModel
    {
        public int ProductID { get; set; }
        public int BillID { get; set; }
        public string ProductName { get; set; }
        public ProductTypeViewModel ProductType { get; set; }
        public string Brand { get; set; }
        public string Amount { get; set; }
        public bool isPlanned { get; set; }
        public decimal? Price { get; set; }
    }
}
