using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace slnTrackerSystem.ViewModel.ProjectVM
{
    public class ListProjectTeamEmployeeVM
    {

        public List<GetData> Results { get; set; }


        public class GetData
        {

            public int ProjectTeamEmployeeId { get; set; }
            public string TeamName { get; set; }
            public string EmployeeName { get; set; }
            public string PositionName { get; set; }
            public bool IsActive { get; set; }
        }
    }
}
