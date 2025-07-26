using Microsoft.AspNetCore.Mvc;
using RecruiterApi.Models;
using RecruiterApi.Data;

namespace RecruiterApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        private readonly RecruiterDbContext _context;

        public NotificationsController(RecruiterDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetNotifications()
        {
            return Ok(_context.Notifications.ToList());
        }

        [HttpPost]
        public async Task<IActionResult> PostNotification([FromBody] Notification notification)
        {
            try
            {
                _context.Notifications.Add(notification);
                await _context.SaveChangesAsync();
                return Ok(notification);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Failed to save notification. Error: {ex.Message}");
            }
        }
    }
}
