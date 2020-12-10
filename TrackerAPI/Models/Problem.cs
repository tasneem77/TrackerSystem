using System;
using System.Collections.Generic;

#nullable disable

namespace slnTrackerSystem.Models
{
    public partial class Problem
    {
        public int Id { get; set; }
        public int? RequestTypeId { get; set; }
        public int? RequestStatusId { get; set; }
        public int? RequestModeId { get; set; }
        public int? RequestLevelId { get; set; }
        public int? UrgencyId { get; set; }
        public int? ImpactId { get; set; }
        public int? PeriorityId { get; set; }
        public int? CategoryId { get; set; }
        public int? ClientId { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? ClosedDate { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
}
