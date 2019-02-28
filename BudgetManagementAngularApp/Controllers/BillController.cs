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
                Date = x.Date.ToString(),
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
                //Categories = string.Join(", ", db.Product.Where(y => y.Billid == x.Billid).Select(z => db.Producttype.Where(w => z.Producttypeid == w.Productypeid).Select(w => w.Icon)).ToArray())

                Categories = (from p in db.Product
                              join pt in db.Producttype on p.Producttypeid equals pt.Productypeid
                              where p.Billid == x.Billid
                              select new ProductTypeViewModel {
                                  ProductTypeID = pt.Productypeid,
                                  TypeName = pt.Typename,
                                  Icon = pt.Icon
                              }).Distinct().ToList()
            }).ToList().OrderByDescending(x => x.Date);
        }

        [HttpGet("[action]")]
        public BillViewModel GetBillByID(int billid)
        {
            using (BudgetAppDbContext db = new BudgetAppDbContext())
            {
                BillViewModel bill = db.Bill.Where(x=> x.Billid == billid).Select(x => new BillViewModel
                {
                    BillID = x.Billid,
                    Date = x.Date.ToString(),
                    Memo = x.Memo,
                    isVerified = x.Verified,
                    Products = db.Product.Where(y => y.Billid == x.Billid).Select(y => new ProductViewModel
                    {
                        ProductID = y.Productid,
                        ProductName = y.Name,
                        ProductType = db.Producttype.Where(z => z.Productypeid == y.Producttypeid).Select(z => new ProductTypeViewModel
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
                    Categories = (from p in db.Product
                                  join pt in db.Producttype on p.Producttypeid equals pt.Productypeid
                                  where p.Billid == x.Billid
                                  select new ProductTypeViewModel
                                  {
                                      ProductTypeID = pt.Productypeid,
                                      TypeName = pt.Typename,
                                      Icon = pt.Icon
                                  }).Distinct().ToList()
                }).FirstOrDefault();

                foreach(ProductTypeViewModel category in bill.Categories)
                {
                    category.Products = db.Product.Where(x => x.Billid == billid && x.Producttypeid == category.ProductTypeID).Select(y => new ProductViewModel
                    {
                        ProductID = y.Productid,
                        ProductName = y.Name,
                        ProductType = db.Producttype.Where(z => z.Productypeid == y.Producttypeid).Select(z => new ProductTypeViewModel
                        {
                            ProductTypeID = z.Productypeid,
                            TypeName = z.Typename,
                            Icon = z.Icon
                        }).First(),
                        isPlanned = y.Isplanned,
                        Amount = y.Amount,
                        Price = y.Price,
                        Brand = y.Brand
                    }).ToList();
                }

                return bill;
            }
        }

        [HttpPost("[action]")]
        public IActionResult SaveBill([FromBody]BillViewModel bill)
        {
            try
            {
                BudgetAppDbContext db = new BudgetAppDbContext();

                bill.Company.CompanyID = SaveCompany(bill.Company);


                if (bill.BillID != 0 && bill.Company.CompanyID != 0)
                {
                    Bill newBill = new Bill
                    {
                        Billid = bill.BillID,
                        Memo = bill.Memo,
                        Companyid = bill.Company.CompanyID,
                        Date = DateTime.Parse(bill.Date)
                    };
                    db.Bill.Update(newBill);
                }
                else
                {
                    Bill newBill = new Bill
                    {
                        Memo = bill.Memo,
                        Companyid = bill.Company.CompanyID,
                        Date = DateTime.Parse(bill.Date),
                        Utctimestamp = DateTime.UtcNow
                    };
                    db.Bill.Add(newBill);
                }

                db.SaveChanges();
            }
            catch (Exception e)
            {
                return Json(new ResponseViewModel() { status = false, message = e.Message });
            }
            return Json(new ResponseViewModel() { status = true, message = "Bill has been successfully saved!" });
        }

        public int SaveCompany(CompanyViewModel comp)
        {
            try
            {
                BudgetAppDbContext db = new BudgetAppDbContext();

                if (!CompanyExists(comp))
                {

                    if (!LocationExists(comp.Location))
                    {
                        Location newLocation = new Location
                        {
                            City = comp.Location.City,
                            Country = comp.Location.Country,
                            State = comp.Location.State,
                            Utctimestamp = DateTime.UtcNow
                        };
                        db.Location.Add(newLocation);
                        db.SaveChanges();

                        comp.Location.LocationID = newLocation.Locationid;
                    }

                    Company newCompany = new Company
                    {
                        Locationid = comp.Location.LocationID,
                        Name = comp.CompanyName,
                        Utctimestamp = DateTime.UtcNow
                    };
                    db.Company.Add(newCompany);
                    db.SaveChanges();

                    return newCompany.Companyid;
                }

                return comp.CompanyID;
            }
            catch (Exception e)
            {
                return 0;
            }        
        }

        public bool CompanyExists(CompanyViewModel company)
        {
            try
            {
                using(BudgetAppDbContext db = new BudgetAppDbContext())
                {
                    CompanyViewModel comp1 = db.Company.Where(z => z.Companyid == company.CompanyID && z.Name == company.CompanyName).Select(z => new CompanyViewModel
                    {
                        CompanyID = z.Companyid,
                        CompanyName = z.Name,
                        Location = db.Location.Where(y => y.Locationid == z.Locationid && y.Locationid == company.Location.LocationID && y.City == company.Location.City).Select(y => new LocationViewModel
                        {
                            LocationID = y.Locationid,
                            City = y.City,
                            State = y.State,
                            Country = y.Country
                        }).FirstOrDefault()
                    }).FirstOrDefault();

                    if (comp1 != null && comp1.Location != null)
                        return true;
                    else
                        return false;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool LocationExists(LocationViewModel location)
        {
            try
            {
                using (BudgetAppDbContext db = new BudgetAppDbContext())
                {
                    LocationViewModel loc = db.Location.Where(y => y.City == location.City && y.Locationid == location.LocationID).Select(y => new LocationViewModel
                    {
                        LocationID = y.Locationid,
                        City = y.City,
                        State = y.State,
                        Country = y.Country
                    }).FirstOrDefault();

                    if (loc != null)
                        return true;
                    else
                        return false;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        [HttpPost("[action]")]
        public IActionResult DeleteBill([FromBody]int billid)
        {
            try
            {
                BudgetAppDbContext db = new BudgetAppDbContext();

                Bill billToDelete = (from b in db.Bill where b.Billid == billid select b).FirstOrDefault();


                if (billToDelete != null)
                {
                    db.Bill.Remove(billToDelete);
                    db.SaveChanges();
                    return Json(new ResponseViewModel() { status = true, message = "Bill has been successfully deleted!" });
                }
                else
                {
                    return Json(new ResponseViewModel() { status = false, message = "Bill doesn't exist!" });
                }
            }
            catch (Exception e)
            {
                return Json(new ResponseViewModel() { status = false, message = e.Message });
            }
        }

    }
}