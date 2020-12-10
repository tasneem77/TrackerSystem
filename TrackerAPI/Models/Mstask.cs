using System;
using System.Collections.Generic;

#nullable disable

namespace slnTrackerSystem.Models
{
    public partial class Mstask
    {
        public Mstask()
        {
            TaskMileStoneEmployees = new HashSet<TaskMileStoneEmployee>();
            TimeSheets = new HashSet<TimeSheet>();
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public string Brief { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public TimeSpan? StartTime { get; set; }
        public TimeSpan? EndTime { get; set; }
        public int? MileStoneId { get; set; }

        public virtual ICollection<TaskMileStoneEmployee> TaskMileStoneEmployees { get; set; }
        public virtual ICollection<TimeSheet> TimeSheets { get; set; }
    }
}
