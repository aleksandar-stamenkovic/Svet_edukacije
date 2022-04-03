using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ProjekatAPI.Models
{
    public class Predmet
    {
        public int Id { get; set; }
        public string Ime { get; set; }
        public Predavac Predavac { get; set; }
        public String Skola { get; set; }  // osnovna, srednja, fakultet

    }
}
