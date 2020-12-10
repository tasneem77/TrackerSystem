using System;
using System.Collections.Generic;

#nullable disable

namespace slnTrackerSystem.Models
{
    public partial class ProjectStakeHolder
    {
        public int Id { get; set; }
        public int? ProjectId { get; set; }
        public int? Shid { get; set; }

        public virtual Project Project { get; set; }
        public virtual StakeHolder Sh { get; set; }
    }
}
