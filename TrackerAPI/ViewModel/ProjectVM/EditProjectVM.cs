using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace slnTrackerSystem.ViewModel.ProjectVM
{
    public class EditProjectVM
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Discription { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string Stackholders { get; set; }
        public int? ClientId { get; set; }
        public int? OrganizationId { get; set; }
    }
    public class DetailProjectVM
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Discription { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string Stackholders { get; set; }
        public string ClientName { get; set; }
        public string OrganizationName { get; set; }
        public int? ClientId { get; set; }
        public int? OrganizationId { get; set; }
    }

}
