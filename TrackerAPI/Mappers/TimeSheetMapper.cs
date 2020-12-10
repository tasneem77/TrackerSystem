using slnTrackerSystem.Models;
using slnTrackerSystem.ViewModel.TimeSheetVM;
using System;

namespace slnTrackerSystem.Mappers
{
    public static class TimeSheetMapper
    {
     //   static TrackerDBContext db = new TrackerDBContext();

        public static TimeSheet CreateTimeSheet(this CreateTimeSheetVM model)
        {
            var dtstarttime = DateTime.Parse(model.StartTime).ToString("hh:mm:ss");
            var dtendtime = DateTime.Parse(model.EndTime).ToString("hh:mm:ss");

            var TimeSheetObj = new TimeSheet
            {
                Title = model.Title,
                Comment = model.Comment,
                CompletePercent = Convert.ToDecimal(model.CompletePercent.ToString()),
                StartDate = DateTime.Parse(model.StartDate.ToString()),
                EndDate = DateTime.Parse(model.EndDate.ToString()),
                StartTime = TimeSpan.Parse(dtstarttime),
                EndTime = TimeSpan.Parse(dtendtime),
                EmployeeId = model.EmployeeId,
                StatusId= model.StatusId,
                TaskId= model.TaskId
                
            };
            return TimeSheetObj;
        }

        public static EditTimeSheetVM EditTimeSheet(this TimeSheet model)
        {

            var obj = new EditTimeSheetVM
            {
                Id = model.Id,
                Title = model.Title,
                Comment = model.Comment,
                CompletePercent = model.CompletePercent,
                StartDate = DateTime.Parse(model.StartDate.ToString()),
                EndDate = DateTime.Parse(model.EndDate.ToString()),
                //StartTime = TimeSpan.Parse(model.StartTime),
                //EndTime = TimeSpan.Parse(model.EndTime),
                EmployeeId = model.EmployeeId,
                StatusId = model.StatusId,
                TaskId = model.TaskId
            };
            return obj;
        }


        public static TimeSheet EditTimeSheet(this EditTimeSheetVM model)
        {
            //var dtStartTime = DateTime.Parse(model.StartTime).ToString("HH:mm:ss");
            //var dtEndTime = DateTime.Parse(model.EndTime).ToString("HH:mm:ss");
            var obj = new TimeSheet
            {
                Id = model.Id,
                Title = model.Title,
                Comment = model.Comment,
                CompletePercent = model.CompletePercent,
                StartDate = DateTime.Parse(model.StartDate.ToString()),
                EndDate = DateTime.Parse(model.EndDate.ToString()),
                //StartTime = TimeSpan.Parse(dtStartTime),
                //EndTime = TimeSpan.Parse(dtEndTime),
                EmployeeId = model.EmployeeId,
                StatusId = model.StatusId,
                TaskId = model.TaskId
            };
            return obj;
        }



    }
}
