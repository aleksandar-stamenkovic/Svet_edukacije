using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace ProjekatAPI.Models
{
    public class Zahtev
    {
        public int Id { get; set; }
        public Predavac Predavac { get; set; }
        public Ucenik Ucenik { get; set; }
        public string Tekst { get; set; }
        public bool? Prihvacen { get; set; }
        public DateTime Vreme { get; set; }

        [DefaultValue(false)]
        public bool Glasano  { get; set; }

        public string Predmet { get; set; }
    }
}
