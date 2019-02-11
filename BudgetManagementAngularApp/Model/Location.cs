using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BudgetManagementAngularApp.Model
{
    [Table("location")]
    public partial class Location
    {
        [Column("locationid")]
        public int Locationid { get; set; }
        [Column("city")]
        [StringLength(50)]
        public string City { get; set; }
        [Column("state")]
        [StringLength(10)]
        public string State { get; set; }
        [Column("country")]
        [StringLength(20)]
        public string Country { get; set; }
        [Column("utctimestamp", TypeName = "timestamp with time zone")]
        public DateTime Utctimestamp { get; set; }
    }
}
