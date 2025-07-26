using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecruiterApi.Data;
using RecruiterApi.Models;

namespace RecruiterApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobsController : ControllerBase
    {
        private readonly RecruiterDbContext _context;

        public JobsController(RecruiterDbContext context)
        {
            _context = context;
        }

        // GET: api/jobs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobPost>>> GetJobs()
        {
            return await _context.JobPosts.ToListAsync();
        }

        // GET: api/jobs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<JobPost>> GetJob(int id)
        {
            var job = await _context.JobPosts.FindAsync(id);

            if (job == null)
            {
                return NotFound();
            }

            return job;
        }

        // POST: api/jobs
        [HttpPost]
        public async Task<ActionResult<JobPost>> CreateJob(JobPost jobPost)
        {
            _context.JobPosts.Add(jobPost);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetJob), new { id = jobPost.Id }, jobPost);
        }

        // PUT: api/jobs/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateJob(int id, JobPost updatedJob)
        {
            if (id != updatedJob.Id)
            {
                return BadRequest();
            }

            var existingJob = await _context.JobPosts.FindAsync(id);
            if (existingJob == null)
            {
                return NotFound();
            }

            // Update fields
            existingJob.Title = updatedJob.Title;
            existingJob.Company = updatedJob.Company;
            existingJob.LogoUrl = updatedJob.LogoUrl;
            existingJob.Description = updatedJob.Description;
            existingJob.Location = updatedJob.Location;
            existingJob.Type = updatedJob.Type;
            existingJob.Stipend = updatedJob.Stipend;
            existingJob.Bond = updatedJob.Bond;
            existingJob.WorkMode = updatedJob.WorkMode;
            existingJob.Skills = updatedJob.Skills;
            existingJob.TechStack = updatedJob.TechStack;
            existingJob.CGPA = updatedJob.CGPA;
            existingJob.Branch = updatedJob.Branch;
            existingJob.Year = updatedJob.Year;
            existingJob.CollegeName = updatedJob.CollegeName;
            existingJob.GestQualifiedYear = updatedJob.GestQualifiedYear;
            existingJob.Active = updatedJob.Active;

            await _context.SaveChangesAsync();

            return Ok(existingJob);
        }

        // DELETE: api/jobs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJob(int id)
        {
            var job = await _context.JobPosts.FindAsync(id);
            if (job == null)
            {
                return NotFound();
            }

            _context.JobPosts.Remove(job);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
