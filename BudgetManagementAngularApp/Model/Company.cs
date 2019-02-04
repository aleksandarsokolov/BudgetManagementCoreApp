using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BudgetManagementAngularApp.Model
{
    [Table("company")]
    public partial class Company
    {
        [Column("companyid")]
        public int Companyid { get; set; }
        [Column("locationid")]
        public int Locationid { get; set; }
        [Column("name")]
        [StringLength(100)]
        public string Name { get; set; }
        [Column("utctimestamp", TypeName = "timestamp with time zone")]
        public DateTime? Utctimestamp { get; set; }
    }
}
