using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace slnTrackerSystem.ViewModel.TimeSheetVM
{
    public class CreateTimeSheetVM
    {
        public int? EmployeeId { get; set; }
        public int? TaskId { get; set; }
        public string CompletePercent { get; set; }
        public string Title { get; set; }
        public string Comment { get; set; }
        public int? StatusId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }

    }
}
