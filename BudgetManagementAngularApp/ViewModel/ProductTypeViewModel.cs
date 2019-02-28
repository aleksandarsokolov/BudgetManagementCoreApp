using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetManagementAngularApp.ViewModel
{
    public class ProductTypeViewModel
    {
        public int ProductTypeID;
        public string TypeName;
        public string Icon;
        public List<ProductViewModel> Products { get; set; }
    }
}
