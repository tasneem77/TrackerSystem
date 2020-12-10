using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace slnTrackerSystem.ViewModel.RequestVM
{
    public class IndexRequestDetailVM
    {
        public List<GetData> Results { get; set; }

        public class GetData
        {
            public int Id { get; set; }
            public string Title { get; set; }
            public string StatusName { get; set; }
            public string PlannedStartDateTime { get; set; }
            public string ActualStartDateTime { get; set; }

            public string PlannedEndDateTime { get; set; }
            public string ActualEndDateTime { get; set; }

            public string ReqCode { get; set; }
        }
    }
}
