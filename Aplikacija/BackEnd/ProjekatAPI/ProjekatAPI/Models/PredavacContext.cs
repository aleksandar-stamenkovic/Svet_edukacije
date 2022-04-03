using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProjekatAPI.Models;

namespace ProjekatAPI.Models
{
    public class PredavacContext : DbContext
    {
        public PredavacContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Predavac> Predavaci { get; set; }
        public DbSet<Predmet> Predmeti { get; set; }
        public DbSet<Admin> Admin { get; set; }
        public DbSet<Ucenik> Ucenik { get; set; }
        public DbSet<Zahtev> Zahtevi { get; set; }
        public DbSet<Poruka> Poruke { get; set; }
    }
}
