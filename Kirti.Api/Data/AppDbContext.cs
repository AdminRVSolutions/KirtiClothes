using Microsoft.EntityFrameworkCore;
using Kirti.Api.Models;

namespace Kirti.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<ProductVariant> ProductVariants { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // Define any custom model configuration here
            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasColumnType("decimal(18,2)");
                
            modelBuilder.Entity<Order>()
                .Property(o => o.Total)
                .HasColumnType("decimal(18,2)");
        }
    }
}
