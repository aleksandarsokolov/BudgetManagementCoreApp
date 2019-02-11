using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BudgetManagementAngularApp.Model
{
    [Table("product")]
    public partial class Product
    {
        [Column("productid")]
        public int Productid { get; set; }
        [Column("billid")]
        public int Billid { get; set; }
        [Column("listid")]
        public int Listid { get; set; }
        [Column("name")]
        [StringLength(100)]
        public string Name { get; set; }
        [Column("brand")]
        [StringLength(100)]
        public string Brand { get; set; }
        [Column("amount")]
        [StringLength(100)]
        public string Amount { get; set; }
        [Column("producttypeid")]
        public int Producttypeid { get; set; }
        [Column("price", TypeName = "money")]
        public decimal Price { get; set; }
        [Column("utctimestamp", TypeName = "timestamp with time zone")]
        public DateTime Utctimestamp { get; set; }
        [Required]
        [Column("isplanned")]
        public bool Isplanned { get; set; }
    }
}
