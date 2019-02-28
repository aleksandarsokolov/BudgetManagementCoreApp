using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BudgetManagementAngularApp.Model;
using BudgetManagementAngularApp.ViewModel;
using Microsoft.AspNetCore.Mvc;

namespace BudgetManagementAngularApp.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        //[HttpGet("[action]")]
        //public IEnumerable<ProductViewModel> GetProductsByBillID()
        //{
        //    try
        //    {
        //        using (BudgetAppDbContext db = new BudgetAppDbContext())
        //        {
        //            ProductViewModel product = db.Product.Where(x => x.Billid ==)

        //        }
        //    }
        //    catch (Exception e)
        //    {

        //    }
        //}
    }
}