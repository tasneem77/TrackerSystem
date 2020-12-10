using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using slnTrackerSystem.Mappers;
using slnTrackerSystem.Models;
using slnTrackerSystem.ViewModel.MileStoneVM;

// For more information on enabling Web API for empty MileStones, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace slnTrackerSystem.Controllers
{
    [EnableCors]
    [Route("api/[controller]")]
    [ApiController]
    public class MileStoneController : ControllerBase
    {
        readonly TrackerDBContext _context;
        public MileStoneController(TrackerDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("ListMileStones")]
        public IEnumerable<MileStone> Get()
        {
            return _context.MileStones.ToList();
        }

        [Route("GetMileStoneByProjectId/{projectId}")]
        public  List<ListMileStoneVM.GetData> Get(int projectId)
        {
            return _context.MileStones.Where(a => a.ProjectId == projectId).ToList().IndexMileStoneViewModel();
        }


        [Route("GetProjectsByMileStoneId/{milestoneId}")]
        public async Task<List<Project>> GetProjectsByMileStoneId(int milestoneId)
        {
            return await (from ms in _context.MileStones
             join pro in _context.Projects on ms.ProjectId equals pro.Id
             where ms.Id == milestoneId      
             select pro).ToListAsync();
           // return await _context.MileStones.Where(a => a.Id == milestoneId).Select(e=>e.p).ToListAsync();
        }

        [Route("GetMileStoneById/{id}")]
        public async Task<EditMileStoneVM> GetMileStoneById(int id)
        {
            var milestone = await _context.MileStones.FindAsync(id);
            var milestoneObj = milestone.EditMileStone();
            return milestoneObj;
        }

        [HttpPost]
        [Route("CreateMileStone")]
        public int CreateMileStone(CreateMileStoneVM model)
        {
            var MileStoneObj = model.CreateMileStone();
            _context.MileStones.Add(MileStoneObj);
            int Id = _context.SaveChanges();
            return Id;
        }


        [HttpPut]
        [Route("UpdateMileStone")]
        public void UpdateMileStone(EditMileStoneVM MileStoneObj)
        {
            var milestone =  _context.MileStones.Find(MileStoneObj.Id);
            if (MileStoneObj.StartDate == null)
                MileStoneObj.StartDate = DateTime.Parse(milestone.StartDate.ToString()).ToShortDateString();
            if (MileStoneObj.EndDate == null)
                MileStoneObj.EndDate = DateTime.Parse(milestone.EndDate.ToString()).ToShortDateString();



            var updatedObj = MileStoneObj.EditMileStone();
            _context.Entry(milestone).State = EntityState.Detached;
            _context.SaveChanges();

            _context.Entry(updatedObj).State = EntityState.Modified;
            _context.SaveChanges();
        }


        [HttpDelete]
        [Route("DeleteMileStone/{id}")]
        public void Delete(int id)
        {
            var MileStoneObj = _context.MileStones.Find(id);
            _context.MileStones.Remove(MileStoneObj);
            _context.SaveChanges();
        }
    }
}
