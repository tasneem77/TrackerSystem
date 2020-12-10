using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using slnTrackerSystem.Mappers;
using slnTrackerSystem.Models;
using slnTrackerSystem.ViewModel.TeamVM;

// For more information on enabling Web API for empty Teams, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace slnTrackerSystem.Controllers
{
    [EnableCors]
    [Route("api/[controller]")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        readonly TrackerDBContext _context;
        public TeamController(TrackerDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("ListTeams")]
        public async Task<List<Team>> Get()
        {
            return await _context.Teams.ToListAsync();
        }



        [Route("GetTeamById/{id}")]
        public async Task<Team> Get(int id)
        {
            return await _context.Teams.FindAsync(id);
        }


        [HttpPost]
        [Route("CreateTeam")]
        public IActionResult CreateTeam(CreateEmployeeVM model)
        {
            var TeamObj = model.CreateTeam();
            _context.Teams.Add(TeamObj);
            _context.SaveChanges();
            return Ok();
        }



        [HttpPut]
        [Route("UpdateTeam")]
        public void UpdateTeam(EditEmployeeVM teamObj)
        {
            var updatedObj = teamObj.EditTeam();
            _context.Entry(updatedObj).State = EntityState.Modified;
            _context.SaveChanges();
        }


        [HttpDelete]
        [Route("DeleteTeam/{id}")]
        public int Delete(int id)
        {
           if((_context.ProjectTeamEmployees.Where(a=>a.TeamId == id).ToList().Count) >0)
            {
                return 0;
            }
          

            var teamObj = _context.Teams.Find(id);
            _context.Teams.Remove(teamObj);
            _context.SaveChanges();
            int Id = teamObj.Id;
            return Id;
        }
    }
}
