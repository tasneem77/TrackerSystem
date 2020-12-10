using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace slnTrackerSystem.ViewModel.MSTaskVM
{
    public class ListTaskMileStoneEmployeeVM
    {

        public List<GetData> Results { get; set; }


        public class GetData
        {

            public int TaskMileStoneEmployeeId { get; set; }
            public string TeamName { get; set; }
            public string EmployeeName { get; set; }
        }
    }
}
