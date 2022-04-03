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
    public class PredavacController : ControllerBase
    {
        private readonly PredavacContext _context;

        public PredavacController(PredavacContext context)
        {
            _context = context;
        }

        // GET: api/Predavac
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Predavac>>> GetPredavaci()
        {
            /*var predavaciSaPredmetima = _context.Predavaci.Include(x => x.PredavacPredmeti)
                                                          .ThenInclude(x => x.Predmet);

            return await predavaciSaPredmetima.ToListAsync();*/

            return await _context.Predavaci.Include(x => x.Predmeti).ToListAsync(); // samo predavaci
        }

        // GET: api/Predavac/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Predavac>> GetPredavac(int id)
        {
            var predavac = _context.Predavaci.Include(x => x.Predmeti).Where(x => x.Id == id);

            if (predavac == null)
            {
                return NotFound();
            }

            return await predavac.FirstOrDefaultAsync();
        }

        // Statistika za landing page na client-u
        // GET
        [HttpGet("Statistika")]
        public async Task<ActionResult<object>> GetStatistika()
        {
            int brPredavaca = await _context.Predavaci.CountAsync();
            int brUcenika = await _context.Ucenik.CountAsync();
            int brPredmeta = await _context.Predmeti.CountAsync();
            int brPrihvZahteva = await _context.Zahtevi.Where(x => x.Prihvacen == true).CountAsync();

            return new
            {
                brPredavaca = brPredavaca,
                brUcenika = brUcenika,
                brPredmeta = brPredmeta,
                brPrihvZahteva = brPrihvZahteva
            };
        }

        // PUT: api/Predavac/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPredavac(int id, Predavac predavac)
        {
            if (id != predavac.Id)
            {
                return BadRequest();
            }

            _context.Entry(predavac).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PredavacExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPut]
        [Route("{id}/{ocena}/{idZahteva}")]
        public async Task<IActionResult> PutOcena (int id, bool ocena, int idZahteva)
        {
            var predavac = await _context.Predavaci.FindAsync(id);
            var zahtev = await _context.Zahtevi.FindAsync(idZahteva);

            if (zahtev.Glasano == true)
                return BadRequest();

            if (zahtev.Vreme > DateTime.Now)
                return BadRequest();

            zahtev.Glasano = true;

            if (ocena == true)
                predavac.OcenePlus++;
            else
                predavac.OceneMinus++;

            _context.Predavaci.Update(predavac);
            _context.Zahtevi.Update(zahtev);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult<object>> PostLogin(Predavac p)
        {
            var predavac = await _context.Predavaci.Where(x => x.Username == p.Username && x.Password == p.Password)
                                                   .FirstOrDefaultAsync();
            if (predavac != null)
                return new { id = predavac.Id, tip = "predavac" };

            var ucenik = await _context.Ucenik.Where(x => x.Username == p.Username && x.Password == p.Password)
                                                   .FirstOrDefaultAsync();
            if (ucenik != null)
                return new { id = ucenik.Id, tip = "ucenik" };

            var admin = await _context.Admin.Where(x => x.Username == p.Username && x.Password == p.Password)
                                            .FirstOrDefaultAsync();
            if (admin != null)
                return new { id = admin.Id, tip = "admin" };

            return NotFound();
        }

        // POST: api/Predavac
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Predavac>> PostPredavac(Predavac predavac)
        {
            var p = await _context.Predavaci.Where(x => x.Username == predavac.Username).ToListAsync();
            var u = await _context.Ucenik.Where(x => x.Username == predavac.Username).ToListAsync();
            var a = await _context.Admin.Where(x => x.Username == predavac.Username).ToListAsync();
            if (p.Count != 0 || u.Count != 0 || a.Count != 0)
                return BadRequest();

            _context.Predavaci.Add(predavac);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPredavac", new { id = predavac.Id }, predavac);
        }

        // DELETE: api/Predavac/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Predavac>> DeletePredavac(int id)
        {
            var predavac = await _context.Predavaci.FindAsync(id);
            if (predavac == null)
            {
                return NotFound();
            }

            _context.Predavaci.Remove(predavac);
            await _context.SaveChangesAsync();

            return predavac;
        }

        private bool PredavacExists(int id)
        {
            return _context.Predavaci.Any(e => e.Id == id);
        }
    }
}
