using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace slnTrackerSystem.ViewModel.EmployeeVM
{
    public class CreateEmployeeVM
    {
        public string Name { get; set; }
        public string Phone { get; set; }
        public string WhatsApp { get; set; }
        public DateTime? Dob { get; set; }
        public int? TeamId { get; set; }
        public string EmpImg { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
    }
}
