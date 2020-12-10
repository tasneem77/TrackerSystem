using Microsoft.AspNetCore.Mvc.ViewFeatures;
using slnTrackerSystem.Helpers;
using slnTrackerSystem.Models;
using slnTrackerSystem.ViewModel.ProjectVM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace slnTrackerSystem.Mappers
{
    public static class ProjectMapper
    {

        readonly static TrackerDBContext db = new TrackerDBContext();
       // static string dtStartTime, dtEndTime;
        public static Project CreateProject(this CreateProjectVM model)
        {

            //if (model.StartTime != "")
            //    dtStartTime = DateTime.Parse(model.StartTime).ToString("HH:mm:ss");
            //if (model.EndTime != "")
            //    dtEndTime = DateTime.Parse(model.EndTime).ToString("HH:mm:ss");

            var projectObj = new Project
            {
                Name = model.Name,
                Discription = model.Discription,
                StartDate = model.StartDate != null ? DateTime.Parse(model.StartDate.ToString()) : new DateTime(),
                EndDate = model.EndDate != null ? DateTime.Parse(model.EndDate.ToString()) : new DateTime(),
               // StartTime = TimeSpan.Parse(dtStartTime) != null ? TimeSpan.Parse(dtStartTime) : new TimeSpan(),
              //  EndTime = TimeSpan.Parse(dtEndTime) != null ? TimeSpan.Parse(dtEndTime) : new TimeSpan(),
                ProjectCode = "Project_" + DateTime.Today.Date.Year + DateTime.Today.Date.Month + DateTime.Today.Date.Day
            };
            return projectObj;
        }

        public static EditProjectVM EditProject(this Project model)
        {
            //string[] getStartTime = DateHelper.ToFormat12h(DateTime.Parse(model.StartTime.ToString())).Split(",");
            //var startTime = getStartTime[1].ToString().Remove(5, 3);
            var obj = new EditProjectVM
            {
                Id = model.Id,
                Name = model.Name,
                Discription = model.Discription,
                StartDate = DateTime.Parse(model.StartDate.ToString()),
                EndDate = DateTime.Parse(model.EndDate.ToString()),
                StartTime = model.StartTime.ToString(),
                EndTime = model.EndTime.ToString()
            };
            return obj;
        }

        public static DetailProjectVM ProjectDetail(this Project model)
        {
            var obj = new DetailProjectVM
            {
                Id = model.Id,
                Name = model.Name,
                Discription = model.Discription,
                StartDate = DateTime.Parse(model.StartDate.ToString()),
                EndDate = DateTime.Parse(model.EndDate.ToString()),
                StartTime = model.StartTime.ToString(),
                EndTime = model.EndTime.ToString(),
                ClientName = (from clnt in db.Clients
                              join pco in db.ProjectClientOrganizations on clnt.Id equals pco.ClientId
                              where pco.ProjectId == model.Id
                              select clnt).FirstOrDefault().Name,
                OrganizationName = (from org in db.Organizations
                                    join pco in db.ProjectClientOrganizations on org.Id equals pco.OrganizationId
                                    where pco.ProjectId == model.Id
                                    select org).FirstOrDefault().Name
            };
            return obj;
        }

        public static Project EditProject(this EditProjectVM model)
        {
            //var dtStartTime = DateTime.Parse(model.StartTime).ToString("HH:mm:ss");
            //var dtEndTime = DateTime.Parse(model.EndTime).ToString("HH:mm:ss");

            var obj = new Project
            {
                Id = model.Id,
                Name = model.Name,
                Discription = model.Discription,
                StartDate = DateTime.Parse(model.StartDate.ToString()),
                EndDate = DateTime.Parse(model.EndDate.ToString()),
                StartTime = TimeSpan.Parse(model.StartTime),
                EndTime = TimeSpan.Parse(model.EndTime)
            };
            return obj;
        }


        public static List<ListProjectTeamEmployeeVM.GetData> MapProjectTeamEmployeeViewModel(this List<ProjectTeamEmployee> projectTeamEmployees)
        {
            return projectTeamEmployees.Select(item => new ListProjectTeamEmployeeVM.GetData
            {
                ProjectTeamEmployeeId = item.Id,
                EmployeeName = db.Employees.Where(a => a.Id == item.EmployeeId).FirstOrDefault().Name,
                TeamName = db.Teams.Where(a => a.Id == item.TeamId).FirstOrDefault().Name,
                PositionName = db.Ptepositions.Where(a => a.Id == item.PtepositionId).FirstOrDefault().Name,
                IsActive = (bool)item.IsActive
            }).ToList();
        }
    }
}
