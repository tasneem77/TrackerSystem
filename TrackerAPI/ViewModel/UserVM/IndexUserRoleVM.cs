using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace slnTrackerSystem.ViewModel.UserVM
{
    public class IndexUserRoleVM
    {
        public List<GetData> Results { get; set; }
        public class GetData
        {
            public int Id { get; set; }
            public string UserName { get; set; }
            public string Email { get; set; }
            public string RoleName { get; set; }
        }
    }
}
