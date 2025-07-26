using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecruiterApi.Data;
using RecruiterApi.Models;

namespace RecruiterApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TriggersController : ControllerBase
    {
        private readonly RecruiterDbContext _context;

        public TriggersController(RecruiterDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Trigger>>> GetTriggers()
        {
            return await _context.Triggers.ToListAsync();
        }

[HttpPost]
public async Task<ActionResult<Trigger>> PostTrigger(Trigger trigger)
{
    if (!ModelState.IsValid)
        return BadRequest(ModelState);

    try
    {
        _context.Triggers.Add(trigger);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetTriggers), new { id = trigger.Id }, trigger);
    }
    catch (Exception ex)
    {
        // Log to console for debugging
        Console.WriteLine("❌ Exception: " + ex.Message);
        if (ex.InnerException != null)
        {
            Console.WriteLine("💥 Inner Exception: " + ex.InnerException.Message);
        }

        return StatusCode(500, "An error occurred while saving the trigger.");
    }
}



        // Optional: Add Delete, Put if needed
    }
}
