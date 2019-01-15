using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BudgetManagementAngularApp.Model
{
    [Table("producttype")]
    public partial class Producttype
    {
        [Column("productypeid")]
        public int Productypeid { get; set; }
        [Column("typename")]
        [StringLength(100)]
        public string Typename { get; set; }
        [Column("icon")]
        [StringLength(100)]
        public string Icon { get; set; }
        [Column("utctimestamp", TypeName = "timestamp with time zone")]
        public DateTime? Utctimestamp { get; set; }
    }
}
