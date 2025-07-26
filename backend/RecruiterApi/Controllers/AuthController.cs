using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecruiterApi.Data;
using RecruiterApi.Models;

namespace RecruiterApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly RecruiterDbContext _context;

        public AuthController(RecruiterDbContext context)
        {
            _context = context;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] SignupDto signup)
        {
            if (await _context.Users.AnyAsync(u => u.Email == signup.Email))
            {
                return BadRequest(new { message = "Email already exists" });
            }

            var user = new User
            {
                Email = signup.Email,
                PasswordHash = signup.Password // plain text for now
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { user.Id, user.Email });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest login)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == login.Email);

            if (user == null || user.PasswordHash != login.Password)
            {
                return BadRequest(new { message = "Invalid email or password" });
            }

            return Ok(new { user.Id, user.Email });
        }
    }
}
