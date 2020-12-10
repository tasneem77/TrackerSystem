using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using slnTrackerSystem.Mappers;
using slnTrackerSystem.Models;
using slnTrackerSystem.ViewModel.MSTaskVM;

namespace slnTrackerSystem.Controllers
{
    [EnableCors]
    [Route("api/[controller]")]
    [ApiController]
    public class MSTaskController : ControllerBase
    {
        readonly TrackerDBContext _context;
        public MSTaskController(TrackerDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("ListTasks")]
        public async Task<List<Mstask>> Get()
        {
            return await _context.Mstasks.ToListAsync();
        }
        [Route("GetTaskById/{id}")]
        public async Task<EditTaskVM> Get(int id)
        {
            var MSTask = await _context.Mstasks.FindAsync(id);
            var MSTaskObj = MSTask.EditMSTask();
            return MSTaskObj;
        }
        [HttpPost]
        [Route("CreateTask")]
        public int CreateMSTask(CreateMSTaskVM model)
        {
            var MSTaskObj = model.CreateTask();
            _context.Mstasks.Add(MSTaskObj);
            _context.SaveChanges();
            int Id = MSTaskObj.Id;
            return Id;
        }
        [HttpPut]
        [Route("UpdateTask")]
        public void UpdateMSTask(EditTaskVM MSTaskObj)
        {
            var updatedObj = MSTaskObj.EditMSTask();
            _context.Entry(updatedObj).State = EntityState.Modified;
            _context.SaveChanges();
        }
        [HttpDelete]
        [Route("DeleteTask/{id}")]
        public int Delete(int id)
        {
            var lstTaskMileStones = _context.TaskMileStoneEmployees.Where(a => a.TaskId == id).ToList();
            if (lstTaskMileStones.Count > 0)
                return 0;
            var MSTaskObj = _context.Mstasks.Find(id);
            _context.Mstasks.Remove(MSTaskObj);
            _context.SaveChanges();
            return 1;
        }





        [HttpPost]
        [Route("CreateTaskMileStoneEmployees")]
        public void CreateMSTaskTeamEmployees(List<TaskMileStoneEmployee> model)
        {
            foreach (var item in model)
            {
                _context.TaskMileStoneEmployees.Add(item);
                _context.SaveChanges();
            }
        }

        [Route("GetTaskMileStoneEmployeeByTaskId/{taskId}")]
        public List<ListTaskMileStoneEmployeeVM.GetData> GetTaskMileStoneEmployeeByTaskId(int taskId)
        {
            return _context.TaskMileStoneEmployees.Where(a => a.TaskId == taskId).ToList().MapTaskMileStoneEmployeViewModel();
        }



        //[HttpPut]
        //[Route("UpdateMSTaskTeamEmployeeIsActive/{MSTaskTeamEmployeeId}")]
        //public void UpdateMSTaskTeamEmployeeIsActive(int MSTaskTeamEmployeeId)
        //{

        //    var editMSTaskTeamEmployeeObj = _context.MSTaskTeamEmployees.Find(MSTaskTeamEmployeeId);
        //    if (editMSTaskTeamEmployeeObj.IsActive == false)
        //        editMSTaskTeamEmployeeObj.IsActive = true;
        //    else if (editMSTaskTeamEmployeeObj.IsActive == true)
        //        editMSTaskTeamEmployeeObj.IsActive = false;
        //    _context.Entry(editMSTaskTeamEmployeeObj).State = EntityState.Modified;
        //    _context.SaveChanges();
        //}


        [HttpDelete]
        [Route("DeleteTaskMileStoneEmployee/{taskTeamEmployeeId}")]
        public void DeleteMSTaskTeamEmployee(int taskTeamEmployeeId)
        {
            var MSTaskTeamEmployeeObj = _context.TaskMileStoneEmployees.Find(taskTeamEmployeeId);
            _context.TaskMileStoneEmployees.Remove(MSTaskTeamEmployeeObj);
            _context.SaveChanges();
        }





        [Route("GetTeamByMileStoneProjectId/{projectId}")]
        public List<Team> GetTeamByMileStoneProjectId(int projectId)
        {
            var lstTeams = (from tm in _context.Teams
                            join pte in _context.ProjectTeamEmployees on tm.Id equals pte.TeamId
                            join pro in _context.Projects on pte.ProjectId equals pro.Id
                            join mile in _context.MileStones on pro.Id equals mile.ProjectId
                            where pro.Id == projectId
                            select tm).ToList().GroupBy(a => a.Id).Select(item => new Team
                            {
                                Id = item.FirstOrDefault().Id,
                                Name = item.FirstOrDefault().Name
                            }).ToList();
            return lstTeams;

        }


        [Route("GetTeamNotINByMileStoneProjectId/{projectId}")]
        public List<Team> GetTeamNotINByMileStoneProjectId(int projectId)
        {
            List<Team> lst = new List<Team>();
            var lstTeams = (from tm in _context.Teams
                            join pte in _context.ProjectTeamEmployees on tm.Id equals pte.TeamId
                            join pro in _context.Projects on pte.ProjectId equals pro.Id
                            where pte.ProjectId != projectId
                            select tm).ToList().GroupBy(a => a.Id).ToList().Distinct();
            foreach (var items in lstTeams)
            {
                Team teamObj = new Team
                {
                    Id = items.FirstOrDefault().Id,
                    Name = items.FirstOrDefault().Name
                };
                lst.Add(teamObj);
            }
            return lst;

        }


    }
}
