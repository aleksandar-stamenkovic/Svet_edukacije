using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjekatAPI.Models
{
    public class Poruka
    {
        public int Id { get; set; }
        public int PredavacId { get; set; }
        public int UcenikId { get; set; }
        public string Tekst { get; set; }
        public DateTime Vreme { get; set; }
    }
}
