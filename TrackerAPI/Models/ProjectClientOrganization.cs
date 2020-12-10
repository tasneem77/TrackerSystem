using System;
using System.Collections.Generic;

#nullable disable

namespace slnTrackerSystem.Models
{
    public partial class ProjectClientOrganization
    {
        public int Id { get; set; }
        public int? OrganizationId { get; set; }
        public int? ClientId { get; set; }
        public int? ProjectId { get; set; }
    }
}
