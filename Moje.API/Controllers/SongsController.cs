using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moje.API.Data;
using Moje.API.Dtos;
using Moje.API.Models;

namespace Moje.API.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class SongsController : ControllerBase
    {  
        private readonly DataContext _context;

        public SongsController(DataContext context)
        {
            _context = context;
            
        }


    [HttpGet]
    public async Task<IActionResult> GetSongs()
    { 
        var songs = await _context.Songs.ToListAsync();
        return Ok(songs);
    }


      [HttpGet("[action]/{id}")]
    public async Task <IActionResult> GetPreviousSong (int id)
    {
        if(id <= 1)
        {
        var song = await _context.Songs.FirstOrDefaultAsync(x => x.Id == 1 );
        return Ok(song);
        }
        else
        {
        var song = await _context.Songs.FirstOrDefaultAsync(x => x.Id == id - 1 );
            if (song == null)
            {
                var i = id;
                while( song == null )
                {             
                -- i;
                song = await _context.Songs.FirstOrDefaultAsync(x => x.Id == i  );                    
                }}        
            return Ok(song);
        }
    }
    [HttpGet("[action]/{id}")]
    public async Task <IActionResult> GetNextSong (int id)
    {
        var song = await _context.Songs.FirstOrDefaultAsync(x => x.Id == id + 1 );
        if(song == null)
         {
         song = await _context.Songs.FirstOrDefaultAsync(x => x.Id > id  );
           if(song == null)
            {
              song = await _context.Songs.FirstOrDefaultAsync(x => x.Id == 1  );
            }
         }      
        return Ok(song);
    }
    
  

    [HttpPost("{addSong}")]
    public async Task <IActionResult> AddSong([FromBody] Song  song)
    {
        _context.Songs.Add(song);
        await _context.SaveChangesAsync();
        return Ok(song);
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> EditSong(int id, [FromBody] Song song)
    {
        var data = await _context.Songs.FindAsync(id);
        data.Title = song.Title;
        data.Artist = song.Artist;
        data.Genre = song.Genre;
        data.UrlToDownload = song.UrlToDownload;
        data.UrlToPlay = song.UrlToPlay;
        _context.Songs.Update(data);
        await _context.SaveChangesAsync();
        return Ok(data);
    }

    [HttpDelete("{id}")]
    public async Task <IActionResult> DeleteValue(int id)
    {
         var data = await _context.Songs.FindAsync(id);

         if (data == null)
         {
             return NoContent();            
         }
        _context.Songs.Remove(data);
        await _context.SaveChangesAsync();
        return Ok(data); 
    }

 }
}
 