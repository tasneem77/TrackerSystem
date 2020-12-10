using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace slnTrackerSystem.ViewModel.MSTaskVM
{
    public class EditTaskVM
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Brief { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public int MileStoneId { get; set; }
    }
}
