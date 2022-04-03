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
    public class PredmetController : ControllerBase
    {
        private readonly PredavacContext _context;

        public PredmetController(PredavacContext context)
        {
            _context = context;
        }

        // GET: api/Predmet
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Predmet>>> GetPredmeti()
        {
            return await _context.Predmeti.Include(x => x.Predavac).ToListAsync();
        }

        // GET: api/Predmet/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Predmet>> GetPredmet(int id)
        {
            var predmet = await _context.Predmeti.FindAsync(id);

            if (predmet == null)
            {
                return NotFound();
            }

            return predmet;
        }

        [HttpGet]
        [Route("pretraga/{naziv}/{skola}")]
        public async Task<ActionResult<IEnumerable<Predmet>>> PretragaPredmeti(string naziv, string skola)
        {
            var predmeti = await _context.Predmeti.Include(x=>x.Predavac)
                                                  .Where(x => x.Ime.Contains(naziv) && x.Skola == skola)
                                                  .ToListAsync();

            return predmeti;
        }

        // PUT: api/Predmet/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPredmet(int id, Predmet predmet)
        {
            if (id != predmet.Id)
            {
                return BadRequest();
            }

            _context.Entry(predmet).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PredmetExists(id))
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

        // POST: api/Predmet
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        [Route("{predavacId}")]
        public async Task<ActionResult<Predmet>> PostPredmet(Predmet predmet, int predavacId)
        {
            var predavac = await _context.Predavaci.FindAsync(predavacId);
            predmet.Predavac = predavac;
            _context.Predmeti.Add(predmet);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPredmet", new { id = predmet.Id }, predmet);
        }

        // DELETE: api/Predmet/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Predmet>> DeletePredmet(int id)
        {
            var predmet = await _context.Predmeti.FindAsync(id);
            if (predmet == null)
            {
                return NotFound();
            }

            _context.Predmeti.Remove(predmet);
            await _context.SaveChangesAsync();

            return predmet;
        }

        private bool PredmetExists(int id)
        {
            return _context.Predmeti.Any(e => e.Id == id);
        }
    }
}
