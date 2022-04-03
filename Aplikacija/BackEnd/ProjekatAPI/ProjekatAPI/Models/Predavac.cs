using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjekatAPI.Models
{
    public class Predavac
    {
        public int Id { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Brtel { get; set; }
        public string Adresa { get; set; }
        public string Opis { get; set; }
        public int OcenePlus { get; set; }
        public int OceneMinus { get; set; }
        public ICollection<Predmet> Predmeti { get; set; }
    }
}
