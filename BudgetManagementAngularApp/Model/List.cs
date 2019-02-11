using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BudgetManagementAngularApp.Model
{
    [Table("list")]
    public partial class List
    {
        [Column("listid")]
        public int Listid { get; set; }
        [Column("date", TypeName = "date")]
        public DateTime? Date { get; set; }
        [Column("title")]
        [StringLength(100)]
        public string Title { get; set; }
        [Column("utctimestamp", TypeName = "timestamp with time zone")]
        public DateTime Utctimestamp { get; set; }
    }
}
