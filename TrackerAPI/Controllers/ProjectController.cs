using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using slnTrackerSystem.Helpers;
using slnTrackerSystem.Mappers;
using slnTrackerSystem.Models;
using slnTrackerSystem.ViewModel.ProjectVM;
using slnTrackerSystem.ViewModel.UserVM;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace slnTrackerSystem.Controllers
{
    [EnableCors]
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        readonly TrackerDBContext _context;
      //  private readonly IHttpContextAccessor _httpContextAccessor;
        // private readonly ISession _session;
        public ProjectController(TrackerDBContext context)
        {
            _context = context;

            // _httpContextAccessor = httpContextAccessor;
            //   _session = _httpContextAccessor.HttpContext.Session;
        }

        [HttpGet]
        [Route("ListProjects/{userId}")]
        public async Task<List<Project>> Get(int? userId)
        {

            if (userId != null)
            {
                var lstRoles = _context.UserRoles.Where(a => a.UserId == userId).ToList();
                if (lstRoles.Count > 0)
                {
                    var lstNames = _context.Roles.Where(a => a.Id == lstRoles[0].RoleId).ToList();
                    if (lstNames.Count > 0)
                    {
                        var roleName = lstNames[0];
                        if (roleName.Name == "User")
                        {
                            var lstProjects = await (from pro in _context.Projects
                                                     join proemp in _context.ProjectTeamEmployees on pro.Id equals proemp.ProjectId
                                                     where proemp.EmployeeId == userId
                                                     select pro).ToListAsync();
                            return lstProjects;
                        }
                        else if (roleName.Name == "SuperAdmin")
                            return await _context.Projects.ToListAsync();
                        else if (roleName.Name == "CEO")
                            return await _context.Projects.ToListAsync();
                        else if (roleName.Name == "PMO")
                            return await _context.Projects.ToListAsync();
                        else if (roleName.Name == "PM")
                        {
                            var empObj = _context.Employees.Where(a => a.UserId == userId).ToList();
                            var lstProjects = await (from pro in _context.Projects
                                                     join proemp in _context.ProjectTeamEmployees on pro.Id equals proemp.ProjectId
                                                     where proemp.EmployeeId == empObj[0].Id
                                                     select pro).ToListAsync();
                            return lstProjects;
                        }
                        else if (roleName.Name == "TL")
                        {
                            var empObj = _context.Employees.Where(a => a.UserId == userId).ToList();
                            var lstProjects = await (from pro in _context.Projects
                                                     join proemp in _context.ProjectTeamEmployees on pro.Id equals proemp.ProjectId
                                                     where proemp.EmployeeId == empObj[0].Id
                                                     select pro).ToListAsync();

                            return lstProjects;
                        }

                    }
                }

            }
            else
                return await _context.Projects.ToListAsync();

            return null;
        }


        [HttpGet]
        [Route("CountProjects/{userId}")]
        public int CountProjects(int? userId)
        {
            if (userId != null)
            {
                var lstRoles = _context.UserRoles.Where(a => a.UserId == userId).ToList();
                if (lstRoles.Count > 0)
                {
                    var lstNames = _context.Roles.Where(a => a.Id == lstRoles[0].RoleId).ToList();
                    if (lstNames.Count > 0)
                    {
                        var roleName = lstNames[0];
                        if (roleName.Name != "User")
                        {
                            return _context.Projects.ToList().Count;
                        }
                        else
                        {
                            return (from emp in _context.Employees
                                    join pte in _context.ProjectTeamEmployees on emp.Id equals pte.EmployeeId
                                    where emp.UserId == userId
                                    select emp).ToList().Count;
                        }
                    }
                }
            }
            else
            {
                return (from emp in _context.Employees
                        join pte in _context.ProjectTeamEmployees on emp.Id equals pte.EmployeeId
                        where emp.UserId == userId
                        select emp).ToList().Count;
            }
            return 0;
        }

        [Route("GetProjectById/{id}")]
        public async Task<EditProjectVM> Get(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            var projectObj = project.EditProject();

            var projectClientOrgObj = _context.ProjectClientOrganizations.Where(a => a.ProjectId == projectObj.Id).FirstOrDefault();
            projectObj.ClientId = projectClientOrgObj.ClientId;
            projectObj.OrganizationId = projectClientOrgObj.OrganizationId;
            return projectObj;
        }

        [Route("GetProjectDetailById/{id}")]
        public async Task<DetailProjectVM> GetProjectDetailById(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            var projectObj = project.ProjectDetail();
            return projectObj;
        }


        [HttpPost]
        [Route("CreateProject")]
        public int CreateProject(CreateProjectVM model)
        {
            var projectObj = model.CreateProject();
            _context.Projects.Add(projectObj);
            _context.SaveChanges();
            int Id = projectObj.Id;

            ProjectClientOrganization projectClientOrganizationObj = new ProjectClientOrganization
            {
                ProjectId = Id,
                ClientId = model.ClientId,
                OrganizationId = model.OrganizationId
            };

            _context.ProjectClientOrganizations.Add(projectClientOrganizationObj);
            _context.SaveChanges();
            return Id;
        }
        [HttpPut]
        [Route("UpdateProject")]
        public void UpdateProject(EditProjectVM projectObj)
        {
            var updatedObj = projectObj.EditProject();
            _context.Entry(updatedObj).State = EntityState.Modified;
            _context.SaveChanges();

            var projectClientOrgObj = _context.ProjectClientOrganizations.Where(a => a.ProjectId == updatedObj.Id).FirstOrDefault();
            projectClientOrgObj.ClientId = projectObj.ClientId;
            projectClientOrgObj.OrganizationId = projectObj.OrganizationId;
            _context.Entry(projectClientOrgObj).State = EntityState.Modified;
            _context.SaveChanges();


        }
        [HttpDelete]
        [Route("DeleteProject/{id}")]
        public string Delete(int id)
        {
            var projectObj = _context.Projects.Find(id);
            var lstPTE = _context.ProjectTeamEmployees.Where(a => a.ProjectId == id).ToList();
            if (lstPTE.Count > 0)
                return "Can't delete this item";

            _context.Projects.Remove(projectObj);
            int isDeleted = _context.SaveChanges();
            return isDeleted.ToString();
        }
        [HttpPost]
        [Route("CreateProjectTeamEmployees")]
        public void CreateProjectTeamEmployees(List<ProjectTeamEmployee> model)
        {
            //  var email =  _context.Employees.Where(a => a.Id == model[0].EmployeeId).FirstOrDefault().Email;
            //    var title = _context.Projects.Where(a => a.Id == model[0].ProjectId).FirstOrDefault().Name;
            //    var brief = _context.Projects.Where(a => a.Id == model[0].ProjectId).FirstOrDefault().Discription;
            //    var smtpClient = new SmtpClient("smtp.gmail.com")
            //    {
            //        Port = 465,
            //        Credentials = new NetworkCredential("pineappleaziz@gmail.com", "p!ne@pple12679"),
            //        EnableSsl = true
            //      //  UseDefaultCredentials = true
            //};
            //    smtpClient.Send("pineappleaziz@gmail.com", email, title, brief);



            foreach (var item in model)
            {
                _context.ProjectTeamEmployees.Add(item);
                _context.SaveChanges();
            }
        }
        [HttpPost]
        [Route("CreateProjectStakeHolders")]
        public void CreateProjectStakeHolders(List<ProjectStakeHolder> model)
        {
            foreach (var item in model)
            {
                _context.ProjectStakeHolders.Add(item);
                _context.SaveChanges();
            }
        }
        [Route("GetProjectTeamEmployeeByProjectId/{projectId}")]
        public List<ListProjectTeamEmployeeVM.GetData> GetProjectTeamEmployeeByProjectId(int projectId)
        {
            return _context.ProjectTeamEmployees.Where(a => a.ProjectId == projectId).ToList().MapProjectTeamEmployeeViewModel();
        }



        [Route("GetProjectStakeHoldersByProjectId/{projectId}")]
        public List<ListProjectStakeHolderVM> GetProjectStakeHoldersByProjectId(int projectId)
        {
            List<ListProjectStakeHolderVM> lst = new List<ListProjectStakeHolderVM>();
            var lstSH = _context.ProjectStakeHolders.Where(a => a.ProjectId == projectId).ToList();
            foreach (var item in lstSH)
            {
                ListProjectStakeHolderVM obj = new ListProjectStakeHolderVM
                {
                    Id = item.Id,
                    PSHName = _context.StakeHolders.Where(a => a.Id == item.Shid).FirstOrDefault().Name
                };
                lst.Add(obj);
            }
            return lst;
        }



        [HttpPut]
        [Route("UpdateProjectTeamEmployeeIsActive/{projectTeamEmployeeId}")]
        public void UpdateProjectTeamEmployeeIsActive(int projectTeamEmployeeId)
        {

            var editProjectTeamEmployeeObj = _context.ProjectTeamEmployees.Find(projectTeamEmployeeId);
            if (editProjectTeamEmployeeObj.IsActive == false)
                editProjectTeamEmployeeObj.IsActive = true;
            else if (editProjectTeamEmployeeObj.IsActive == true)
                editProjectTeamEmployeeObj.IsActive = false;
            _context.Entry(editProjectTeamEmployeeObj).State = EntityState.Modified;
            _context.SaveChanges();
        }


        [HttpDelete]
        [Route("DeleteProjectTeamEmployee/{projectTeamEmployeeId}")]
        public void DeleteProjectTeamEmployee(int projectTeamEmployeeId)
        {
            var projectTeamEmployeeObj = _context.ProjectTeamEmployees.Find(projectTeamEmployeeId);
            _context.ProjectTeamEmployees.Remove(projectTeamEmployeeObj);
            _context.SaveChanges();
        }



        [HttpDelete]
        [Route("DeleteProjectStakeHolder/{pshId}")]
        public void DeleteProjectStakeHolder(int pshId)
        {
            var projectSHbj = _context.ProjectStakeHolders.Find(pshId);
            _context.ProjectStakeHolders.Remove(projectSHbj);
            _context.SaveChanges();
        }



    }
}
