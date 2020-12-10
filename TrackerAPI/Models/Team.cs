using System;
using System.Collections.Generic;

#nullable disable

namespace slnTrackerSystem.Models
{
    public partial class Team
    {
        public Team()
        {
            Employees = new HashSet<Employee>();
            ProjectTeamEmployees = new HashSet<ProjectTeamEmployee>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Employee> Employees { get; set; }
        public virtual ICollection<ProjectTeamEmployee> ProjectTeamEmployees { get; set; }
    }
}
