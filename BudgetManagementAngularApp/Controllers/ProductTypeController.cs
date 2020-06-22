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
    public class ProductTypeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet("[action]")]
        public IEnumerable<ProductTypeViewModel> GetProductTypes()
        {
            try
            {
                using (BudgetAppDbContext db = new BudgetAppDbContext())
                {
                    IEnumerable<ProductTypeViewModel> prodtypes = db.Producttype.Where(x => x.Parentid == 0)
                        .Select(x => new ProductTypeViewModel
                        {
                            ProductTypeID = x.Productypeid,
                            TypeName = x.Typename,
                            Icon = x.Icon,
                            ChildProductTypes = GetChildren(x.Productypeid),
                            ParentTypeID = x.Parentid
                        }).ToList().OrderBy(x => x.TypeName);
                    return prodtypes;
                }
            }
            catch (Exception e)
            {
                return new List<ProductTypeViewModel>();
            }
        }

        public IEnumerable<ProductTypeViewModel> GetChildren(int prodTypeID)
        {
            try
            {
                using (BudgetAppDbContext db = new BudgetAppDbContext())
                {
                    IEnumerable<ProductTypeViewModel> prodtype = db.Producttype.Where(x => x.Parentid == prodTypeID)
                        .Select(x => new ProductTypeViewModel
                        {
                            ProductTypeID = x.Productypeid,
                            TypeName = x.Typename,
                            Icon = x.Icon,
                            ChildProductTypes = GetChildren(x.Productypeid),
                            ParentTypeID = x.Parentid
                        }).ToList().OrderBy(x => x.TypeName);
                    if (prodtype != null)
                        return prodtype;
                    else
                        return new List<ProductTypeViewModel>();
                }
            }
            catch (Exception e)
            {
                return new List<ProductTypeViewModel>();
            }
        }
    }
}