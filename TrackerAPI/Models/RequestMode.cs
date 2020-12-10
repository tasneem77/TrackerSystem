using System;
using System.Collections.Generic;

#nullable disable

namespace slnTrackerSystem.Models
{
    public partial class RequestMode
    {
        public RequestMode()
        {
            TechRequests = new HashSet<TechRequest>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<TechRequest> TechRequests { get; set; }
    }
}
