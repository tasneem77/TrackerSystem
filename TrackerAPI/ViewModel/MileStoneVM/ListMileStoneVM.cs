using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace slnTrackerSystem.ViewModel.MileStoneVM
{
    public class ListMileStoneVM
    {

        public List<GetData> Results { get; set; }


        public class GetData
        {
            public int Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string StartDate { get; set; }
            public string EndDate { get; set; }
            public string StartTime { get; set; }
            public string EndTime { get; set; }
            public int ProjectId { get; set; }
        }
    }
}
