using System;
using System.Collections.Generic;

#nullable disable

namespace slnTrackerSystem.Models
{
    public partial class TimeSheet
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Comment { get; set; }
        public decimal? CompletePercent { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public TimeSpan? StartTime { get; set; }
        public TimeSpan? EndTime { get; set; }
        public int? EmployeeId { get; set; }
        public int? TaskId { get; set; }
        public int? StatusId { get; set; }

        public virtual Employee Employee { get; set; }
        public virtual Tsstatus Status { get; set; }
        public virtual Mstask Task { get; set; }
    }
}
