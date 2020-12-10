using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace slnTrackerSystem.ViewModel.ProjectVM
{
    public class CreateProjectVM
    {
        public string Name { get; set; }
        public string Discription { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        //public string StartTime { get; set; }
        //public string EndTime { get; set; }
        public string Stackholders { get; set; }
        
        public int ClientId { get; set; }
        public int OrganizationId { get; set; }
    }
}
