using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace slnTrackerSystem.ViewModel.RequestVM
{
    public class IndexRequestVM
    {
        public List<GetData> Results { get; set; }
        public class GetData
        {
            public int Id { get; set; }
            public string Subject { get; set; }
            public int? PeriorityId { get; set; }
            public int? UrgentId { get; set; }
            public string PeriorityName { get; set; }
            public string StatusName { get; set; }
            public string ReqCode{ get; set; }
            public string Started { get; set; }
            public string Ended { get; set; }
        }
    }

    public class IndexRequestVM2
    {
        public List<GetData> Results { get; set; }
        public class GetData
        {
            public int id { get; set; }
            public string title { get; set; }
            public string start { get; set; }
            public string end { get; set; }
            public bool allDay { get; set; }
            public string color { get; set; }  
            public string textColor { get; set; }
        }
    }

    public class RequestDateVM
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
