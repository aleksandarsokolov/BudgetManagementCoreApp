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
    public class CompanyController : Controller
    {

        [HttpGet("[action]")]
        public IEnumerable<CompanyViewModel> GetCompanies()
        {
            using (BudgetAppDbContext db = new BudgetAppDbContext())
            {
                IEnumerable<CompanyViewModel> companies = db.Company.Select(x => new CompanyViewModel
                {
                    CompanyID = x.Companyid,
                    CompanyName = x.Name,
                    Location = db.Location.Where(y => y.Locationid == x.Locationid).Select(y => new LocationViewModel
                    {
                        LocationID = y.Locationid,
                        City = y.City,
                        State = y.State,
                        Country = y.Country
                    }).SingleOrDefault()
                }).ToList();
                
                return companies;
            }
        }
    }
}