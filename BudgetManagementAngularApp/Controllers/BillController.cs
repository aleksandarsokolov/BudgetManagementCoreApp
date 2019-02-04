using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using BudgetManagementAngularApp.Model;
using BudgetManagementAngularApp.ViewModel;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Model;

namespace BudgetManagementAngularApp.Controllers
{
    [Route("api/[controller]")]
    public class BillController : Controller
    {
        //public IActionResult Index()
        //{
        //    return View();
        //}


        //[HttpGet("[action]")]
        //public IEnumerable<WeatherForecast> WeatherForecasts()
        //{
        //    var rng = new Random();
        //    return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        //    {
        //        DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
        //        TemperatureC = rng.Next(-20, 55),
        //        Summary = Summaries[rng.Next(Summaries.Length)]
        //    });
        //}

        [HttpGet("[action]")]
        public IEnumerable<BillViewModel> GetBills()
        {
            BudgetAppDbContext db = new BudgetAppDbContext();
            return db.Bill.Select(x => new BillViewModel
            {
                BillID = x.Billid,
                Memo = x.Memo,
                isVerified = x.Verified ?? false,
                Products = db.Product.Where(y => y.Billid == x.Billid).Select(y => new ProductViewModel
                {
                    ProductID = y.Productid,
                    ProductName = y.Name,
                    ProductType =db.Producttype.Where(z => z.Productypeid == y.Producttypeid).Select(z => new ProductTypeViewModel
                    {
                        ProductTypeID = z.Productypeid,
                        TypeName = z.Typename
                    }).First(),
                    isPlanned = y.Isplanned ?? false,
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
                TotalAmount = db.Product.Where(y => y.Billid == x.Billid).Select(y => y.Price).Sum()

            }).ToList();
        }

        //[HttpPost("[action]")]

        [HttpPost]
        [ActionName("SaveBill")]
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

                return CreatedAtRoute("OwnerById", new { id = newBill.Billid });
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }

            //return newBill.Billid;
        }


        
    }
}