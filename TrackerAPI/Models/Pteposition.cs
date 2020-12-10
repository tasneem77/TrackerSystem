using System;
using System.Collections.Generic;

#nullable disable

namespace slnTrackerSystem.Models
{
    public partial class Pteposition
    {
        public Pteposition()
        {
            ProjectTeamEmployees = new HashSet<ProjectTeamEmployee>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<ProjectTeamEmployee> ProjectTeamEmployees { get; set; }
    }
}
