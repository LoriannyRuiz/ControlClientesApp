using ControlClientesBack.Models;
using Microsoft.EntityFrameworkCore;

namespace ControlClientesBack.Data
{
    public class ControlClientesContext : DbContext
    {
       
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Direccion> Direcciones { get; set; }
        public ControlClientesContext(DbContextOptions<ControlClientesContext> options)
       : base(options)
        {
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cliente>()
                .HasKey(w => w.Id);

            modelBuilder.Entity<Cliente>()
                .HasMany(w => w.Direcciones)
                .WithOne(w => w.Cliente)
                .HasForeignKey(w => w.ClienteId);
        }

    }
}