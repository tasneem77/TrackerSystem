using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using slnTrackerSystem.Models;

namespace slnTrackerSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PtepositionController : ControllerBase
    {
        readonly TrackerDBContext _context;
        public PtepositionController(TrackerDBContext context)
        {
            _context = context;
        }



        [HttpGet]
        [Route("ListPTEPositions")]
        public async Task<List<Pteposition>> Get()
        {
            return await _context.Ptepositions.ToListAsync();
        }


  
    }
}
