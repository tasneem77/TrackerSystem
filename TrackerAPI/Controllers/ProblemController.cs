using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using slnTrackerSystem.Mappers;
using slnTrackerSystem.Models;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace slnTrackerSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProblemController : ControllerBase
    {

        readonly TrackerDBContext _context;
        public ProblemController(TrackerDBContext context)
        {
            _context = context;
        }


        [HttpGet]
        [Route("ListProblems")]
        public IEnumerable<Problem> ListProblems()
        {
            return _context.Problems.ToList();
        }

        [HttpGet]
        [Route("ListProblemTypes")]
        public IEnumerable<RequestType> ListProblemTypes()
        {
            return _context.RequestTypes.ToList();
        }
        [HttpGet]
        [Route("ListProblemCategories")]
        public IEnumerable<ReqCategory> ListProblemCategories()
        {
            return _context.ReqCategories.ToList();
        }
        [HttpGet]
        [Route("ListProblemImpacts")]
        public IEnumerable<ReqImact> ListProblemImpacts()
        {
            return _context.ReqImacts.ToList();
        }
        [HttpGet]
        [Route("ListProblemPeriorities")]
        public IEnumerable<ReqPeriority> ListProblemPeriorities()
        {
            return _context.ReqPeriorities.ToList();
        }
        [HttpGet]
        [Route("ListProblemLevels")]
        public IEnumerable<RequestLevel> ListProblemLevels()
        {
            return _context.RequestLevels.ToList();
        }
        [HttpGet]
        [Route("ListProblemModes")]
        public IEnumerable<RequestMode> ListProblemModes()
        {
            return _context.RequestModes.ToList();
        }
        [HttpGet]
        [Route("ListProblemTypeStatus")]
        public IEnumerable<RequestTypeStatus> ListProblemTypeStatus()
        {
            return _context.RequestTypeStatuses.ToList();
        }
        [HttpGet]
        [Route("ListUrgencies")]
        public IEnumerable<Urgency> ListUrgencies()
        {
            return _context.Urgencies.ToList();
        }









        [HttpPost]
        [Route("CreateProblem")]
        public int CreateProblem(Problem model)
        {
            //var ProblemObj = model.CreateProblem();
            _context.Problems.Add(model);
            int Id = _context.SaveChanges();
            return Id;
        }

        [Route("GetProblemById/{id}")]
        public async Task<Problem> GetProblemById(int id)
        {
            var ProblemObj = await _context.Problems.FindAsync(id);
            return ProblemObj;
        }



        [HttpPut]
        [Route("UpdateProblem")]
        public void UpdateProblem(Problem ProblemObj)
        {
           
            _context.Entry(ProblemObj).State = EntityState.Modified;
            _context.SaveChanges();
        }




        [HttpDelete]
        [Route("DeleteProblem/{id}")]
        public void Delete(int id)
        {
            var ProblemObj= _context.Problems.Find(id);
            _context.Problems.Remove(ProblemObj);
            _context.SaveChanges();
        }
    }
}
