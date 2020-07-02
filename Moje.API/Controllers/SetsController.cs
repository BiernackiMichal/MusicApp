using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moje.API.Data;
using Moje.API.Models;

namespace Moje.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class SetsController: ControllerBase
    {
        private readonly DataContext _context;

        public SetsController(DataContext context)
        {
            _context = context;
        }

     [HttpGet]   
     public async Task<IActionResult> GetSets()
     {
         var sets = await _context.Sets.ToListAsync();
         return Ok(sets);         
     }
     [HttpGet("{id}")]
     public async Task<IActionResult> GetSet(int id)
     {
         var set = await _context.Sets.FirstOrDefaultAsync(x => x.Id == id);
         return Ok(set);
     }
        [HttpGet("[action]/{id}")]
    public async Task <IActionResult> GetPreviousSet (int id)
    {
        if(id <= 2)
        {
        var set = await _context.Sets.FirstOrDefaultAsync(x => x.Id == 2 );
        return Ok(set);
        }
        else
        {
         var set = await _context.Sets.FirstOrDefaultAsync(x => x.Id == id - 1 );
            if (set == null)
            {
             var i = id;
             while( set == null )
             {             
             -- i;
            set = await _context.Sets.FirstOrDefaultAsync(x => x.Id == i  );                    
            }}
        return Ok(set);
        }

        
    }
    [HttpGet("[action]/{id}")]
    public async Task <IActionResult> GetNextSet (int id)
    {
        var set = await _context.Sets.FirstOrDefaultAsync(x => x.Id == id + 1 );
        if(set == null)
         {
         set = await _context.Sets.FirstOrDefaultAsync(x => x.Id > id  );
           if(set == null)
            {
              set = await _context.Sets.FirstOrDefaultAsync(x => x.Id > 0  );
            }
         }      
        return Ok(set);
    }
     [HttpPost("{addSet}")]
    public async Task<IActionResult> addSet([FromBody] Set set)
    {
        _context.Sets.Add(set);
        await _context.SaveChangesAsync();
        return Ok(set);
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> editSet (int id, [FromBody] Set set)
    {
        var data = await _context.Sets.FindAsync(id);
        data.Title = set.Title;
        data.Artist = set.Artist;
        data.UrlToDownload = set.UrlToDownload;
        data.UrlToPlay = set.UrlToPlay;
        _context.Sets.Update(data);
        await _context.SaveChangesAsync();
        return Ok(data);
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSet(int id)
    {
        var data = await _context.Sets.FindAsync(id);
        if (data == null)
        {
            return NoContent();
        }
        _context.Sets.Remove(data);
        await _context.SaveChangesAsync();
        return Ok(data);
    }
    }
}