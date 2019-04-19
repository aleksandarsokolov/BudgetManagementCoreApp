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

        [HttpGet("[action]")]
        public IEnumerable<string> GetProductBrands()
        {
            BudgetAppDbContext db = new BudgetAppDbContext();

            try
            {
                return (from p in db.Product 
                        orderby p.Brand
                        where p.Brand != ""
                        select p.Brand).Distinct().ToList();
            }
            catch (Exception e)
            {
                return new List<string>();
            }
        }

        [HttpGet("[action]")]
        public IEnumerable<ProductTypeViewModel> GetProductTypes()
        {
            BudgetAppDbContext db = new BudgetAppDbContext();

            try
            {
                return db.Producttype.Select(x => new ProductTypeViewModel
                {
                    ProductTypeID = x.Productypeid,
                    TypeName = x.Typename,
                    Icon = x.Icon
                }).ToList().OrderBy(x => x.TypeName);
            }
            catch (Exception e)
            {
                return new List<ProductTypeViewModel>();
            }
        }

        [HttpPost("[action]")]
        public IActionResult SaveProduct([FromBody]ProductViewModel product)
        {
            try
            {
                BudgetAppDbContext db = new BudgetAppDbContext();

               
                if (product.ProductID != 0)
                {
                    Product newProd = new Product
                    {
                        Productid = product.ProductID,
                        Billid = product.BillID,
                        Producttypeid = product.ProductType.ProductTypeID,
                        Name = product.ProductName,
                        Brand = product.Brand,
                        Amount = product.Amount,
                        Price = product.Price.GetValueOrDefault(0),
                        Isplanned = product.isPlanned
                    };
                    db.Product.Update(newProd);
                }
                else
                {
                    Product newProd = new Product
                    {
                        Productid = product.ProductID,
                        Billid = product.BillID,
                        Producttypeid = product.ProductType.ProductTypeID,
                        Name = product.ProductName,
                        Brand = product.Brand,
                        Amount = product.Amount,
                        Price = product.Price.GetValueOrDefault(0),
                        Isplanned = product.isPlanned,
                        Utctimestamp = DateTime.UtcNow
                    };                    
                    db.Product.Add(newProd);
                }

                db.SaveChanges();
            }
            catch (Exception e)
            {
                return Json(new ResponseViewModel() { status = false, message = e.Message });
            }
            return Json(new ResponseViewModel() { status = true, message = "Product has been successfully saved!" });
        }


        //[HttpGet("[action]")]
        //public IEnumerable<ProductViewModel> GetProductsByName(string name)
        //{
        //    try
        //    {
        //        using (BudgetAppDbContext db = new BudgetAppDbContext())
        //        {
        //            return db.Product.Where(x => x.Name.StartsWith(name)).Select(x => new ProductViewModel({

        //            }).ToList();

        //        }
        //    }
        //    catch (Exception e)
        //    {

        //    }
        //}
    }
}