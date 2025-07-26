using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecruiterApi.Data;
using RecruiterApi.Models;

namespace RecruiterApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TemplatesController : ControllerBase
    {
        private readonly RecruiterDbContext _context;

        public TemplatesController(RecruiterDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Template>>> GetTemplates()
        {
            return await _context.Templates.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Template>> GetTemplate(int id)
        {
            var template = await _context.Templates.FindAsync(id);
            if (template == null)
            {
                return NotFound();
            }
            return template;
        }

        [HttpPost]
        public async Task<ActionResult<Template>> PostTemplate(Template template)
        {
            _context.Templates.Add(template);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTemplate), new { id = template.Id }, template);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTemplate(int id, Template template)
        {
            if (id != template.Id) return BadRequest();

            _context.Entry(template).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTemplate(int id)
        {
            var template = await _context.Templates.FindAsync(id);
            if (template == null) return NotFound();

            _context.Templates.Remove(template);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
