using System;
using System.Collections.Generic;

#nullable disable

namespace slnTrackerSystem.Models
{
    public partial class Tsstatus
    {
        public Tsstatus()
        {
            TimeSheets = new HashSet<TimeSheet>();
        }

        public int Id { get; set; }
        public string StatusName { get; set; }

        public virtual ICollection<TimeSheet> TimeSheets { get; set; }
    }
}
