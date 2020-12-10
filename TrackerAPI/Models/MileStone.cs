using System;
using System.Collections.Generic;

#nullable disable

namespace slnTrackerSystem.Models
{
    public partial class MileStone
    {
        public MileStone()
        {
            TaskMileStoneEmployees = new HashSet<TaskMileStoneEmployee>();
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public TimeSpan? StartTime { get; set; }
        public TimeSpan? EndTime { get; set; }
        public int? ProjectId { get; set; }

        public virtual ICollection<TaskMileStoneEmployee> TaskMileStoneEmployees { get; set; }
    }
}
