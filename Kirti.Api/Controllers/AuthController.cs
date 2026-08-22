using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Kirti.Api.Data;
using Kirti.Api.Models;

namespace Kirti.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        public class MobileRequest { public string Phone { get; set; } = string.Empty; }
        
        [HttpPost("verify-mobile")]
        public async Task<IActionResult> VerifyMobile([FromBody] MobileRequest request)
        {
            var exists = await _context.Users.AnyAsync(u => u.Phone == request.Phone);
            return Ok(new { exists });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (await _context.Users.AnyAsync(u => u.Phone == user.Phone || u.Email == user.Email))
            {
                return BadRequest(new { message = "User with this phone or email already exists." });
            }

            // Determine role. If it's the first user, make them an admin.
            var isFirstUser = !await _context.Users.AnyAsync();
            user.Role = isFirstUser ? "admin" : "user";
            
            // In a real app, hash the password. Storing plaintext for this simulation.
            
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Registered successfully", user = new { user.Id, user.FirstName, user.LastName, user.Role, user.Phone } });
        }

        public class LoginRequest { public string Phone { get; set; } = string.Empty; public string Password { get; set; } = string.Empty; }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Phone == request.Phone && u.PasswordHash == request.Password);
            
            if (user == null)
            {
                return Unauthorized(new { message = "Invalid phone number or password." });
            }

            return Ok(new { message = "Login successful", user = new { user.Id, user.FirstName, user.LastName, user.Role, user.Phone } });
        }
    }
}
