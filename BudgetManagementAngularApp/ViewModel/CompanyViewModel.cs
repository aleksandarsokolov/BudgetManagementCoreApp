using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetManagementAngularApp.ViewModel
{
    public class CompanyViewModel
    {
        public int CompanyID { get; set; }
        public string CompanyName { get; set; }
        public LocationViewModel Location { get; set; }
    }
}
