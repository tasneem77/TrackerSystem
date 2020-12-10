using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using slnTrackerSystem.Mappers;
using slnTrackerSystem.Models;
using slnTrackerSystem.ViewModel.TimeSheetVM;

namespace slnTrackerSystem.Controllers
{
    [EnableCors]
    [Route("api/[controller]")]
    [ApiController]
    public class TimeSheetController : ControllerBase
    {
        readonly TrackerDBContext _context;
        public TimeSheetController(TrackerDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("ListAllStatus")]
        public async Task<List<Tsstatus>> ListAllStatus()
        {
            return await _context.Tsstatuses.ToListAsync();
        }


        [HttpGet]
        [Route("ListTimeSheets")]
        public async Task<List<TimeSheet>> Get()
        {
            return await _context.TimeSheets.ToListAsync();
        }
        [Route("GetTimeSheetById/{id}")]
        public async Task<EditTimeSheetVM> Get(int id)
        {
            var timeSheet = await _context.TimeSheets.FindAsync(id);
            var MSTimeSheetObj = timeSheet.EditTimeSheet();
            return MSTimeSheetObj;
        }
        [HttpPost]
        [Route("CreateTimeSheet")]
        public int CreateTimeSheet(CreateTimeSheetVM model)
        {
            var timeSheetObj = model.CreateTimeSheet();
            _context.TimeSheets.Add(timeSheetObj);
            _context.SaveChanges();
            int Id = timeSheetObj.Id;
            return Id;
        }
        [HttpPut]
        [Route("UpdateTimeSheet")]
        public void UpdateTimeSheet(EditTimeSheetVM timeSheetObj)
        {
            var updatedObj = timeSheetObj.EditTimeSheet();
            _context.Entry(updatedObj).State = EntityState.Modified;
            _context.SaveChanges();
        }
        [HttpDelete]
        [Route("DeleteTimeSheet/{id}")]
        public void Delete(int id)
        {
            var timeSheetObj = _context.TimeSheets.Find(id);
            _context.TimeSheets.Remove(timeSheetObj);
            _context.SaveChanges();
        }
    }
}
