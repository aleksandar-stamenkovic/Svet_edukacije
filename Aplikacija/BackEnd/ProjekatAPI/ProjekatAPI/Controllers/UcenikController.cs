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
    public class UcenikController : ControllerBase
    {
        private readonly PredavacContext _context;

        public UcenikController(PredavacContext context)
        {
            _context = context;
        }

        // GET: api/Ucenik
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ucenik>>> GetUcenik()
        {
            return await _context.Ucenik.ToListAsync();
        }

        // GET: api/Ucenik/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ucenik>> GetUcenik(int id)
        {
            var ucenik = await _context.Ucenik.FindAsync(id);

            if (ucenik == null)
            {
                return NotFound();
            }

            return ucenik;
        }

        // PUT: api/Ucenik/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUcenik(int id, Ucenik ucenik)
        {
            if (id != ucenik.Id)
            {
                return BadRequest();
            }

            _context.Entry(ucenik).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UcenikExists(id))
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

        [HttpPost]
        [Route("UcenikLogin")]
        public async Task<ActionResult<bool>> PostLogin(Ucenik p)
        {
            var ucenik = await _context.Predavaci.Where(x => x.Username == p.Username && x.Password == p.Password)
                                                   .FirstOrDefaultAsync();
            if (ucenik != null)
                return true;

            return false;
        }

        // POST: api/Ucenik
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Ucenik>> PostUcenik(Ucenik ucenik)
        {
            var p = await _context.Predavaci.Where(x => x.Username == ucenik.Username).ToListAsync();
            var u = await _context.Ucenik.Where(x => x.Username == ucenik.Username).ToListAsync();
            var a = await _context.Admin.Where(x => x.Username == ucenik.Username).ToListAsync();

            if (p.Count != 0 || u.Count != 0 || a.Count != 0)
                return BadRequest();

            _context.Ucenik.Add(ucenik);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUcenik", new { id = ucenik.Id }, ucenik);
        }

        // DELETE: api/Ucenik/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Ucenik>> DeleteUcenik(int id)
        {
            var ucenik = await _context.Ucenik.FindAsync(id);
            if (ucenik == null)
            {
                return NotFound();
            }

            _context.Ucenik.Remove(ucenik);
            await _context.SaveChangesAsync();

            return ucenik;
        }

        private bool UcenikExists(int id)
        {
            return _context.Ucenik.Any(e => e.Id == id);
        }
    }
}
