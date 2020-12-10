using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace slnTrackerSystem.Helpers
{
    public static class DateHelper
    {
        public static string ToFormat12h(this DateTime dt)
        {
            return dt.ToString("yyyy/MM/dd, hh:mm:ss tt");
        }

        public static string ToFormat24h(this DateTime dt)
        {
            return dt.ToString("yyyy/MM/dd, HH:mm:ss");
        }
    }
}
