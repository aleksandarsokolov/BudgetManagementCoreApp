using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BudgetManagementAngularApp.Model
{
    [Table("bill")]
    public partial class Bill
    {
        [Column("billid")]
        public int Billid { get; set; }
        [Column("date", TypeName = "date")]
        public DateTime? Date { get; set; }
        [Column("memo")]
        [StringLength(150)]
        public string Memo { get; set; }
        [Column("companyid")]
        public int? Companyid { get; set; }
        [Column("locationid")]
        public int? Locationid { get; set; }
        [Column("verified")]
        public bool? Verified { get; set; }
        [Column("utctimestamp", TypeName = "timestamp with time zone")]
        public DateTime? Utctimestamp { get; set; }
    }
}
