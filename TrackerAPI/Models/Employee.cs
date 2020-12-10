using System;
using System.Collections.Generic;

#nullable disable

namespace slnTrackerSystem.Models
{
    public partial class Employee
    {
        public Employee()
        {
            ProjectTeamEmployees = new HashSet<ProjectTeamEmployee>();
            TaskMileStoneEmployees = new HashSet<TaskMileStoneEmployee>();
            TimeSheets = new HashSet<TimeSheet>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string WhatsApp { get; set; }
        public DateTime? Dob { get; set; }
        public int? TeamId { get; set; }
        public string EmpImg { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int? UserId { get; set; }
        public int? ParentId { get; set; }
        public string Code { get; set; }

        public virtual Team Team { get; set; }
        public virtual ICollection<ProjectTeamEmployee> ProjectTeamEmployees { get; set; }
        public virtual ICollection<TaskMileStoneEmployee> TaskMileStoneEmployees { get; set; }
        public virtual ICollection<TimeSheet> TimeSheets { get; set; }
        public virtual User User { get; set; }
    }   
}
