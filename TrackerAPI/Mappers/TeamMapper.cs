using Microsoft.AspNetCore.Mvc.ViewFeatures;
using slnTrackerSystem.Models;
using slnTrackerSystem.ViewModel.TeamVM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace slnTrackerSystem.Mappers
{
    public static class TeamMapper
    {
        //public static List<IndexViewModel.GetData> MapIndexViewModel(this List<HealthTip> healthTips)
        //{
        //    return healthTips.Select(item => new IndexViewModel.GetData { Title = item.Title, Description = item.Description, Id = item.Id, ImagePath = item.ImagePath }).ToList();
        //}


        public static Team  CreateTeam(this CreateEmployeeVM model)
        {
            var TeamObj = new Team{

                Name = model.Name
            };
            return TeamObj;
        }


        public static EditEmployeeVM EditTeam(this Team TeamObj)
        {
            EditEmployeeVM model = new EditEmployeeVM
            {
                Id = TeamObj.Id,
                Name = TeamObj.Name
            };
            return model;
        }

        public static Team EditTeam(this EditEmployeeVM model)
        {
            var obj = new Team
            {
                Id = model.Id,
                Name = model.Name
            };
            return obj;
        }


    }
}
