using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using slnTrackerSystem.Models;

namespace slnTrackerSystem.Controllers
{
    [EnableCors]
    [Route("api/[controller]")]
    [ApiController]
    public class StakeHolderController : ControllerBase
    {
        readonly TrackerDBContext _context;
        public StakeHolderController(TrackerDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("ListStakeHolders")]
        public IEnumerable<StakeHolder> Get()
        {
            return _context.StakeHolders.ToList();
        }


        [Route("GetStakeHolderById/{id}")]
        public async Task<StakeHolder> Get(int id)
        {
            return await _context.StakeHolders.FindAsync(id);
        }


        [HttpPost]
        [Route("CreateStakeHolder")]
        public int CreateStakeHolder(StakeHolder model)
        {
            _context.StakeHolders.Add(model);
            _context.SaveChanges();
            int Id = model.Id;
            return Id;
        }

        [HttpPut]
        [Route("UpdateStakeHolder")]
        public void UpdateStakeHolder(StakeHolder StakeHolderObj)
        {
            _context.Entry(StakeHolderObj).State = EntityState.Modified;
            _context.SaveChanges();
        }

        
        [HttpDelete]
        [Route("DeleteStakeHolder/{id}")]
        public void Delete(int id)
        {
            var StakeHolderObj = _context.StakeHolders.Find(id);
            _context.StakeHolders.Remove(StakeHolderObj);
            _context.SaveChanges();
        }
    }
}
