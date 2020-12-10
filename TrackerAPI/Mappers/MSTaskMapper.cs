using Microsoft.AspNetCore.Mvc.ViewFeatures;
using slnTrackerSystem.Helpers;
using slnTrackerSystem.Models;
using slnTrackerSystem.ViewModel.MSTaskVM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace slnTrackerSystem.Mappers
{
    public static class MSTaskMapper
    {
       readonly static TrackerDBContext db = new TrackerDBContext();

        public static Mstask CreateTask(this CreateMSTaskVM model)
        {
            var dtStartTime = DateTime.Parse(model.StartTime).ToString("HH:mm:ss");
            var dtEndTime = DateTime.Parse(model.EndTime).ToString("HH:mm:ss");

            var MSTaskObj = new Mstask
            {
                Title = model.Title,
                Brief = model.Brief,
                StartDate = DateTime.Parse(model.StartDate.ToString()),
                EndDate = DateTime.Parse(model.EndDate.ToString()),
                StartTime = TimeSpan.Parse(dtStartTime),
                EndTime = TimeSpan.Parse(dtEndTime),
                MileStoneId = model.MileStoneId
            };
            return MSTaskObj;
        }

        public static EditTaskVM EditMSTask(this Mstask model)
        {

            var obj = new EditTaskVM
            {
                Id = model.Id,
                Title = model.Title,
                Brief = model.Brief,
                StartDate = DateTime.Parse(model.StartDate.ToString()),
                EndDate = DateTime.Parse(model.EndDate.ToString()),
                StartTime = model.StartTime.ToString(),
                EndTime = model.EndTime.ToString(),
                MileStoneId = int.Parse(model.MileStoneId.ToString())
            };
            return obj;
        }


        public static Mstask EditMSTask(this EditTaskVM model)
        {
            var dtStartTime = DateTime.Parse(model.StartTime).ToString("HH:mm:ss");
            var dtEndTime = DateTime.Parse(model.EndTime).ToString("HH:mm:ss");
            var obj = new Mstask
            {
                Id = model.Id,
                Title = model.Title,
                Brief = model.Brief,
                StartDate = DateTime.Parse(model.StartDate.ToString()),
                EndDate = DateTime.Parse(model.EndDate.ToString()),
                StartTime = TimeSpan.Parse(dtStartTime),
                EndTime = TimeSpan.Parse(dtEndTime),
                MileStoneId = model.MileStoneId
            };
            return obj;
        }


        public static List<ListTaskMileStoneEmployeeVM.GetData> MapTaskMileStoneEmployeViewModel(this List<TaskMileStoneEmployee> taskMileStoneEmployees)
        {
            return taskMileStoneEmployees.Select(item => new ListTaskMileStoneEmployeeVM.GetData
            {
                TaskMileStoneEmployeeId = item.Id,
                EmployeeName = db.Employees.Where(a => a.Id == item.EmployeeId).FirstOrDefault().Name,
                TeamName = (from tm in db.Teams
                           join emp in db.Employees on tm.Id equals emp.TeamId
                            where emp.Id == item.EmployeeId
                            select tm).ToList().FirstOrDefault().Name              
            }).ToList();
        }

    }
}
