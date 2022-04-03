using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjekatAPI.Models;

namespace ProjekatAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ZahtevController : ControllerBase
    {
        private readonly PredavacContext _context;

        public ZahtevController(PredavacContext context)
        {
            _context = context;
        }

        // GET: api/Zahtev
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Zahtev>>> GetZahtevi()
        {
            return await _context.Zahtevi.Include(x => x.Predavac).Include(x => x.Ucenik).ToListAsync();
        }

        // GET: api/Zahtev/5
        [HttpGet("{predavacId}")]
        public async Task<ActionResult<IEnumerable<Zahtev>>> GetZahtev(int predavacId)
        {
            var zahtevi = await _context.Zahtevi.Where(x => x.Predavac.Id == predavacId)
                                                .OrderByDescending(x => x.Id)
                                                .Include(x => x.Ucenik)
                                                .ToListAsync();

            if (zahtevi == null)
            {
                return NotFound();
            }

            return zahtevi;
        }

        // GET: api/Zahtev/Ucenik/5
        [HttpGet]
        [Route("Ucenik/{ucenikId}")]
        public async Task<ActionResult<IEnumerable<Zahtev>>> GetZahtevUcenik(int ucenikId)
        {
            var zahtevi = await _context.Zahtevi.Where(x => x.Ucenik.Id == ucenikId)
                                                .OrderByDescending(x => x.Id)
                                                .Include(x => x.Predavac)
                                                .ToListAsync();
            if(zahtevi == null)
            {
                return NotFound();
            }

            return zahtevi;
        }

        [HttpGet]
        [Route("Kalendar/{predavacId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetZahtevPrihvaceni(int predavacId)
        {
            var zahtevi = await _context.Zahtevi.Where(x => x.Predavac.Id == predavacId && x.Prihvacen == true)
                                                .Include(x => x.Ucenik)
                                                .ToListAsync();

            var zahteviSort =
                from zahtev in zahtevi
                orderby zahtev.Vreme descending
                select new { imeUcenika = zahtev.Ucenik.Ime,
                    prezimeUcenika = zahtev.Ucenik.Prezime,
                    usernameUcenika = zahtev.Ucenik.Username,
                    datum = zahtev.Vreme,
                    predmet = zahtev.Predmet };
                //select zahtev;

            return zahteviSort.ToList();
        }

        [HttpGet]
        [Route("Kalendar/Ucenik/{ucenikId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetZahtevPRihvaceniUcenik(int ucenikId)
        {
            var zahtevi = await _context.Zahtevi.Where(x => x.Ucenik.Id == ucenikId && x.Prihvacen == true)
                                                .Include(x => x.Predavac)
                                                .ToListAsync();

            var zahteviSort =
                from zahtev in zahtevi
                orderby zahtev.Vreme descending
                select new
                {
                    imePredavaca = zahtev.Predavac.Ime,
                    prezimePredavaca = zahtev.Predavac.Prezime,
                    usernamePredavaca = zahtev.Predavac.Username,
                    datum = zahtev.Vreme,
                    predmet = zahtev.Predmet
                };

            return zahteviSort.ToList();
        }


        // PUT: api/Zahtev/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut]
        [Route("{id}/{tekst}/{prihvacen:bool?}")]
        public async Task PutZahtev(int id, string tekst, bool? prihvacen)
        {
            var zahtev = await _context.Zahtevi.FindAsync(id);
            if (tekst != null && tekst!="null")
            {
                zahtev.Tekst = tekst;
            }
            if (prihvacen != null)
            {
                zahtev.Prihvacen = prihvacen;
            }
            //zahtev.Vreme = DateTime.Now;
            _context.Zahtevi.Update(zahtev);
            await _context.SaveChangesAsync();
        }

        [HttpPut]
        [Route("reply/{id}")]
        public async Task<IActionResult> PutZahtev2(int id, [FromBody]string text)
        {
            var zahtev = await _context.Zahtevi.FindAsync(id);
            if (text != null && text != "null")
            {
                zahtev.Tekst = text;
            }
            //zahtev.Vreme = DateTime.Now;
            _context.Zahtevi.Update(zahtev);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut]
        [Route("zakazi/{id}")]
        public async Task<IActionResult> PutZahtev3(int id, [FromBody]DateTime datum)
        {
            var zahtev = await _context.Zahtevi.FindAsync(id);
            zahtev.Vreme = datum;
            zahtev.Prihvacen = true;
            _context.Zahtevi.Update(zahtev);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // POST: api/Zahtev
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        [Route("{predavacId}/{ucenikId}")]
        public async Task<ActionResult<Zahtev>> PostZahtev(Zahtev zahtev, int predavacId, int ucenikId)
        {
            var predavac = await _context.Predavaci.FindAsync(predavacId);
            var ucenik = await _context.Ucenik.FindAsync(ucenikId);

            zahtev.Predavac = predavac;
            zahtev.Ucenik = ucenik;
            zahtev.Vreme = DateTime.Now;

            _context.Zahtevi.Add(zahtev);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/Zahtev/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Zahtev>> DeleteZahtev(int id)
        {
            var zahtev = await _context.Zahtevi.FindAsync(id);
            if (zahtev == null)
            {
                return NotFound();
            }

            _context.Zahtevi.Remove(zahtev);
            await _context.SaveChangesAsync();

            return zahtev;
        }

        private bool ZahtevExists(int id)
        {
            return _context.Zahtevi.Any(e => e.Id == id);
        }

    }
}
