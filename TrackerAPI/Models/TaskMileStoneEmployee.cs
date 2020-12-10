using System;
using System.Collections.Generic;

#nullable disable

namespace slnTrackerSystem.Models
{
    public partial class TaskMileStoneEmployee
    {
        public int Id { get; set; }
        public int? MileStoneId { get; set; }
        public int? EmployeeId { get; set; }
        public int? TaskId { get; set; }

        public virtual Employee Employee { get; set; }
        public virtual MileStone MileStone { get; set; }
        public virtual Mstask Task { get; set; }
    }
}
