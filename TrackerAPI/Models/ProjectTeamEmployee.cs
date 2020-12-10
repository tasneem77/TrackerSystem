using System;
using System.Collections.Generic;

#nullable disable

namespace slnTrackerSystem.Models
{
    public partial class ProjectTeamEmployee
    {
        public int Id { get; set; }
        public int? TeamId { get; set; }
        public int? EmployeeId { get; set; }
        public int? ProjectId { get; set; }
        public int? PtepositionId { get; set; }
        public bool? IsActive { get; set; }

        public virtual Employee Employee { get; set; }
        public virtual Project Project { get; set; }
        public virtual Pteposition Pteposition { get; set; }
        public virtual Team Team { get; set; }
    }
}
