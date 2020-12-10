using System;
using System.Collections.Generic;

#nullable disable

namespace slnTrackerSystem.Models
{
    public partial class ReqSubCategory
    {
        public ReqSubCategory()
        {
            TechRequests = new HashSet<TechRequest>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int? ReqCategoryId { get; set; }

        public virtual ReqCategory ReqCategory { get; set; }
        public virtual ICollection<TechRequest> TechRequests { get; set; }
    }
}
