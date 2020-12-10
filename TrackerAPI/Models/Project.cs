using System;
using System.Collections.Generic;

#nullable disable

namespace slnTrackerSystem.Models
{
    public partial class Project
    {
        public Project()
        {
            ProjectStakeHolders = new HashSet<ProjectStakeHolder>();
            ProjectTeamEmployees = new HashSet<ProjectTeamEmployee>();
            TechRequests = new HashSet<TechRequest>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Discription { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public TimeSpan? StartTime { get; set; }
        public TimeSpan? EndTime { get; set; }
        public string ProjectCode { get; set; }

        public virtual ICollection<ProjectStakeHolder> ProjectStakeHolders { get; set; }
        public virtual ICollection<ProjectTeamEmployee> ProjectTeamEmployees { get; set; }
        public virtual ICollection<TechRequest> TechRequests { get; set; }
    }
}
