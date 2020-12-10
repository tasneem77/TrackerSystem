using System;
using System.Collections.Generic;

#nullable disable

namespace slnTrackerSystem.Models
{
    public partial class RequestDetail
    {
        public int Id { get; set; }
        public int? RequestId { get; set; }
        public int? StatusId { get; set; }
        public DateTime? PlannedStartDate { get; set; }
        public TimeSpan? PlannedStartTime { get; set; }
        public DateTime? PlannedEndDate { get; set; }
        public TimeSpan? PlannedEndTime { get; set; }
        public DateTime? ActualStartDate { get; set; }
        public TimeSpan? ActualStartTime { get; set; }
        public DateTime? ActualEndDate { get; set; }
        public TimeSpan? ActualEndTime { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ActualStarted { get; set; }
        public string ActualEnded { get; set; }
        public string PlannedStarted { get; set; }
        public string PlannedEnded { get; set; }
        public int? LoggedId { get; set; }
        public int? FromEmpId { get; set; }
        public int? ToEmpId { get; set; }

        public virtual TechRequest Request { get; set; }
        public virtual RequestTypeStatus Status { get; set; }
    }
}
