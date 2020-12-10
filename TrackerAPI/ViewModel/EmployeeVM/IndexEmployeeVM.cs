using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace slnTrackerSystem.ViewModel.EmployeeVM
{
    public class IndexEmployeeVM
    {
  

        public List<GetData> Results { get; set; }
    
       
        public class GetData
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Phone { get; set; }
            public string Email { get; set; }
            public string TeamName { get; set; }
            public string EmpImg { get; set; }
        }
    }
}
