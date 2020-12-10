using System;
using System.Collections.Generic;

#nullable disable

namespace slnTrackerSystem.Models
{
    public partial class TechRequest
    {
        public TechRequest()
        {
            RequestDetails = new HashSet<RequestDetail>();
        }

        public int Id { get; set; }
        public string ReqCode { get; set; }
        public string Subject { get; set; }
        public string Note { get; set; }
        public string Description { get; set; }
        public DateTime? CreatedDate { get; set; }
        public TimeSpan? CreatedTime { get; set; }
        public string Started { get; set; }
        public string Ended { get; set; }
        public int? RequestTypeId { get; set; }
        public int? RequestStatusId { get; set; }
        public int? RequestModeId { get; set; }
        public int? RequestLevelId { get; set; }
        public int? ImpactId { get; set; }
        public int? PeriorityId { get; set; }
        public int? CategoryId { get; set; }
        public int? ClientId { get; set; }
        public int? ProjectId { get; set; }
        public int? SubCategoryId { get; set; }
        public int? OrganizationId { get; set; }

        public virtual ReqCategory Category { get; set; }
        public virtual Client Client { get; set; }
        public virtual ReqImact Impact { get; set; }
        public virtual Organization Organization { get; set; }
        public virtual ReqPeriority Periority { get; set; }
        public virtual Project Project { get; set; }
        public virtual RequestLevel RequestLevel { get; set; }
        public virtual RequestMode RequestMode { get; set; }
        public virtual RequestTypeStatus RequestStatus { get; set; }
        public virtual RequestType RequestType { get; set; }
        public virtual ReqSubCategory SubCategory { get; set; }
        public virtual ICollection<RequestDetail> RequestDetails { get; set; }
    }
}
