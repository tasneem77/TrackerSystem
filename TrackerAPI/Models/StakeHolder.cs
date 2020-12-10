using System;
using System.Collections.Generic;

#nullable disable

namespace slnTrackerSystem.Models
{
    public partial class StakeHolder
    {
        public StakeHolder()
        {
            ProjectStakeHolders = new HashSet<ProjectStakeHolder>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Mobile { get; set; }

        public virtual ICollection<ProjectStakeHolder> ProjectStakeHolders { get; set; }
    }
}
