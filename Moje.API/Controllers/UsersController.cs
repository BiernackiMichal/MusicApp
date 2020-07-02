using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moje.API.Data;
using Moje.API.Models;

namespace Moje.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;

        public UsersController(DataContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetUsers ()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser (int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
            return Ok(user);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditUser (int id, [FromBody] User user)
        {
            var data = await _context.Users.FindAsync(id);
            data.Username = user.Username;
            data.UserRole = user.UserRole;
            _context.Users.Update(data);
            await _context.SaveChangesAsync();
            return Ok(data);    
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser (int id) 
        {
            var data = await _context.Users.FindAsync(id);
            if(data == null) 
            {
                return NoContent();
            }
            _context.Users.Remove(data);
            await _context.SaveChangesAsync();
            return Ok(data);

        }


    }
}