using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace slnTrackerSystem.ViewModel.ProjectVM
{
    public class EditProjectTeamEmployeeVM
    {
        public int Id { get; set; }
        public int? TeamId { get; set; }
        public int? EmployeeId { get; set; }
        public int? ProjectId { get; set; }
        public bool IsActive { get; set; }
    }
}
