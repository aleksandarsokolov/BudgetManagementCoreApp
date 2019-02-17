using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

namespace BudgetManagementAngularApp.Model
{
    public partial class BudgetAppDbContext : DbContext
    {
        public BudgetAppDbContext()
        {
        }

        public BudgetAppDbContext(DbContextOptions<BudgetAppDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Bill> Bill { get; set; }
        public virtual DbSet<Company> Company { get; set; }
        public virtual DbSet<List> List { get; set; }
        public virtual DbSet<Location> Location { get; set; }
        public virtual DbSet<Product> Product { get; set; }
        public virtual DbSet<Producttype> Producttype { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                // optionsBuilder.UseNpgsql("Host=localhost;Database=BudgetManagement;Username=postgres;Password=admin123");

                string connStr = ConfigurationExtensions.GetConnectionString(Startup.Configuration, "DefaultConnection");


                optionsBuilder.UseNpgsql(connStr);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Bill>(entity =>
            {
                entity.Property(e => e.Billid).ForNpgsqlUseSequenceHiLo("bill_billid_seq");
            });

            modelBuilder.Entity<Company>(entity =>
            {
                entity.Property(e => e.Companyid).ForNpgsqlUseSequenceHiLo("company_companyid_seq");
            });

            modelBuilder.Entity<List>(entity =>
            {
                entity.Property(e => e.Listid).ForNpgsqlUseSequenceHiLo("list_listid_seq");
            });

            modelBuilder.Entity<Location>(entity =>
            {
                entity.Property(e => e.Locationid).ForNpgsqlUseSequenceHiLo("location_locationid_seq");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(e => e.Productid).ForNpgsqlUseSequenceHiLo("product_productid_seq");

                entity.Property(e => e.Isplanned).HasDefaultValueSql("true");
            });

            modelBuilder.Entity<Producttype>(entity =>
            {
                entity.HasKey(e => e.Productypeid)
                    .HasName("producttype_pkey");

                entity.Property(e => e.Productypeid).ForNpgsqlUseSequenceHiLo("producttype_productypeid_seq");
            });
        }
    }
}
