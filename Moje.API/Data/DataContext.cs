using Microsoft.EntityFrameworkCore;
using Moje.API.Models;

namespace Moje.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}
        
          public DbSet<Song> Songs { get; set; }   
          public DbSet<User> Users { get; set; }
          public DbSet<Set> Sets { get; set; }
    }
}