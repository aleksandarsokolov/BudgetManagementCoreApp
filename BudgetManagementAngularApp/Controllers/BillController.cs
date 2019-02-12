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
    public class BillController : Controller
    {

        [HttpGet("[action]")]
        public IEnumerable<BillViewModel> GetBills()
        {
            BudgetAppDbContext db = new BudgetAppDbContext();
            return db.Bill.Select(x => new BillViewModel
            {
                BillID = x.Billid,
                Memo = x.Memo,
                isVerified = x.Verified,
                Products = db.Product.Where(y => y.Billid == x.Billid).Select(y => new ProductViewModel
                {
                    ProductID = y.Productid,
                    ProductName = y.Name,
                    ProductType =db.Producttype.Where(z => z.Productypeid == y.Producttypeid).Select(z => new ProductTypeViewModel
                    {
                        ProductTypeID = z.Productypeid,
                        TypeName = z.Typename,
                        Icon = z.Icon
                    }).First(),
                    isPlanned = y.Isplanned,
                    Amount = y.Amount,
                    Price = y.Price,
                    Brand = y.Brand
                }).ToList(),
                Company = db.Company.Where(z => z.Companyid == x.Companyid).Select(z => new CompanyViewModel
                {
                    CompanyID = z.Companyid,
                    CompanyName = z.Name,
                    Location = db.Location.Where(y => y.Locationid == z.Locationid).Select(y => new LocationViewModel
                    {
                        LocationID = y.Locationid,
                        City = y.City,
                        State = y.State,
                        Country = y.Country
                    }).FirstOrDefault()

                }).FirstOrDefault(),
                TotalCount = db.Product.Where(y => y.Billid == x.Billid).Count(),
                TotalAmount = db.Product.Where(y => y.Billid == x.Billid).Select(y => y.Price).Sum(),
                Categories = string.Join(", ", db.Product.Where(y => y.Billid == x.Billid).Select(z => db.Producttype.Where(w => z.Producttypeid == w.Productypeid).Select(w => w.Icon).ToArray()))
            }).ToList();
        }

        [HttpPost("[action]")]
        public IActionResult SaveBill([FromBody]BillViewModel bill)
        {
            try
            {
                BudgetAppDbContext db = new BudgetAppDbContext();
                Bill newBill = new Bill
                {
                    Billid = bill.BillID,
                    Memo = bill.Memo,
                    Companyid = bill.Company.CompanyID,
                    Date = DateTime.Parse(bill.Date),
                    Utctimestamp = DateTime.UtcNow
                };

                db.Bill.Add(newBill);
                db.SaveChanges();
            }
            catch (Exception e)
            {
                return Json(false);
            }
            return Json(true);
        }



    }
}