using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using slnTrackerSystem.Mappers;
using slnTrackerSystem.Models;
using slnTrackerSystem.ViewModel.RequestVM;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace slnTrackerSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TechRequestController : ControllerBase
    {

        readonly TrackerDBContext _context;
        public TechRequestController(TrackerDBContext context)
        {
            _context = context;
        }


        [HttpGet]
        [Route("ListTechRequests/{userId}")]
        public IEnumerable<IndexRequestVM.GetData> ListTechRequests(int? userId)
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
                            var lstRequests = (from pro in _context.Projects
                                               join proemp in _context.ProjectTeamEmployees on pro.Id equals proemp.ProjectId
                                               join req in _context.TechRequests on proemp.ProjectId equals req.ProjectId
                                               where proemp.EmployeeId == userId
                                               select req).ToList().MapIndexViewModel();
                            return lstRequests;
                        }
                        else
                        {
                            if (roleName.Name == "SuperAdmin")
                                return _context.TechRequests.ToList().MapIndexViewModel();
                            else if (roleName.Name == "CEO")
                                return _context.TechRequests.ToList().MapIndexViewModel();
                            else if (roleName.Name == "PMO")
                                return _context.TechRequests.ToList().MapIndexViewModel();
                            else if (roleName.Name == "PM")
                            {
                                var empObj = _context.Employees.Where(a => a.UserId == userId).ToList();
                                var lstRequests = (from pro in _context.Projects
                                                   join proemp in _context.ProjectTeamEmployees on pro.Id equals proemp.ProjectId
                                                   join req in _context.TechRequests on proemp.ProjectId equals req.ProjectId
                                                   where proemp.EmployeeId == empObj[0].Id
                                                   select req).ToList().MapIndexViewModel();
                                return lstRequests;
                            }
                            else if (roleName.Name == "TL")
                            {
                                var empObj = _context.Employees.Where(a => a.UserId == userId).ToList();
                                var lstRequests = (from pro in _context.Projects
                                                   join proemp in _context.ProjectTeamEmployees on pro.Id equals proemp.ProjectId
                                                   join req in _context.TechRequests on proemp.ProjectId equals req.ProjectId
                                                   where proemp.EmployeeId == empObj[0].Id
                                                   select req).ToList().MapIndexViewModel();
                                return lstRequests;
                            }

                        }
                    }
                }
            }
            else
                return _context.TechRequests.ToList().MapIndexViewModel();

            return _context.TechRequests.ToList().MapIndexViewModel();
        }


        [HttpGet]
        [Route("CountRequests/{userId}")]
        public int CountRequests()
        {
            return _context.TechRequests.ToList().Count;
        }

        [HttpGet]
        [Route("ListRequestsByProjectId/{projectId}")]
        public IEnumerable<IndexRequestVM.GetData> ListRequestsByProjectId(int projectId)
        {
            return _context.TechRequests.Where(a => a.ProjectId == projectId).ToList().MapIndexViewModel();
        }
        [HttpGet]
        [Route("ListRequestsByPeriorityId/{periorityId}")]
        public IEnumerable<IndexRequestVM.GetData> ListRequestsByPeriorityId(int periorityId)
        {
            return _context.TechRequests.Where(a => a.PeriorityId == periorityId).ToList().MapIndexViewModel();
        }

        [HttpGet]
        [Route("ListRequestsByStatusId/{statusId}")]
        public IEnumerable<IndexRequestVM.GetData> ListRequestsByStatusId(int statusId)
        {
            return _context.TechRequests.Where(a => a.RequestStatusId == statusId).ToList().MapIndexViewModel();
        }


        [HttpGet]
        [Route("ListRequestsByCategoryId/{categoryId}")]
        public IEnumerable<IndexRequestVM.GetData> ListRequestsByCategoryId(int categoryId)
        {
            return _context.TechRequests.Where(a => a.CategoryId == categoryId).ToList().MapIndexViewModel();
        }


        [HttpPost]
        [Route("ListRequestsByDate")]
        public IEnumerable<IndexRequestVM.GetData> ListRequestsByDate(RequestDateVM model)
        {
            var lstRequests = _context.TechRequests.Where(a => a.CreatedDate.Value >= model.StartDate.Value && a.CreatedDate.Value <= model.EndDate.Value).ToList().MapIndexViewModel();
            return lstRequests;
        }



        [HttpGet]
        [Route("ListRequestDetails/{requestId}")]
        public IEnumerable<IndexRequestDetailVM.GetData> ListRequestDetails(int requestId)
        {
            return _context.RequestDetails.Where(a => a.RequestId == requestId).ToList().MapRequestDetailsViewModel();
        }

        [HttpGet]
        [Route("CalendarRequests")]
        public IEnumerable<IndexRequestVM2.GetData> CalendarRequests()
        {
            return _context.TechRequests.ToList().MapIndexViewModel2();
        }


        [HttpGet]
        [Route("CalendarRequestDetails/{requestId}")]
        public IEnumerable<IndexRequestVM2.GetData> CalendarRequestDetails(int requestId)
        {
            return _context.RequestDetails.Where(a => a.RequestId == requestId).ToList().MapActualCalendar();
        }


        [HttpGet]
        [Route("CalendarRequestDetailPlannedCalendarByUserId/{requestId}/{userId}")]
        public IEnumerable<IndexRequestVM2.GetData> CalendarRequestDetailPlannedCalendarByUserId(int requestId, int? userId)
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
                        return _context.RequestDetails.Where(a => a.RequestId == requestId && a.LoggedId == userId).ToList().MapPlannedCalendar();
                    }
                    else if (roleName.Name == "TL")
                    {
                        return _context.RequestDetails.Where(a => a.RequestId == requestId).ToList().MapPlannedCalendar();
                    }
                    else if (roleName.Name == "PM")
                    {
                        return _context.RequestDetails.Where(a => a.RequestId == requestId).ToList().MapPlannedCalendar();
                    }
                    else if (roleName.Name == "PMO")
                    {
                        return _context.RequestDetails.Where(a => a.RequestId == requestId).ToList().MapPlannedCalendar();
                    }
                    else if (roleName.Name == "SuperAdmin")
                    {
                        return _context.RequestDetails.Where(a => a.RequestId == requestId).ToList().MapPlannedCalendar();
                    }
                }
            }

            return _context.RequestDetails.Where(a => a.RequestId == requestId).ToList().MapPlannedCalendar();
        }



        [HttpGet]
        [Route("CalendarRequestDetailActualCalendarByUserId/{requestId}/{userId}")]
        public IEnumerable<IndexRequestVM2.GetData> CalendarRequestDetailActualCalendarByUserId(int requestId, int? userId)
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
                        return _context.RequestDetails.Where(a => a.RequestId == requestId && a.LoggedId == userId).ToList().MapActualCalendar();
                    }
                    else if (roleName.Name == "TL")
                    {
                        return _context.RequestDetails.Where(a => a.RequestId == requestId).ToList().MapActualCalendar();
                    }
                    else if (roleName.Name == "PM")
                    {
                        return _context.RequestDetails.Where(a => a.RequestId == requestId).ToList().MapActualCalendar();
                    }
                    else if (roleName.Name == "PMO")
                    {
                        return _context.RequestDetails.Where(a => a.RequestId == requestId).ToList().MapActualCalendar();
                    }
                    else if (roleName.Name == "SuperAdmin")
                    {
                        return _context.RequestDetails.Where(a => a.RequestId == requestId).ToList().MapActualCalendar();
                    }
                }
            }

            return _context.RequestDetails.Where(a => a.RequestId == requestId).ToList().MapActualCalendar();
        }








        [HttpGet]
        [Route("CalendarRequestDetailPlannedCalendar/{requestId}")]
        public IEnumerable<IndexRequestVM2.GetData> CalendarRequestDetailPlannedCalendar(int requestId)
        {
            return _context.RequestDetails.Where(a => a.RequestId == requestId).ToList().MapPlannedCalendar();
        }

        [HttpGet]
        [Route("CalendarRequestDetailActualCalendar/{requestId}")]
        public IEnumerable<IndexRequestVM2.GetData> CalendarRequestDetailActualCalendar(int requestId)
        {
            return _context.RequestDetails.Where(a => a.RequestId == requestId).ToList().MapActualCalendar();
        }


        [HttpGet]
        [Route("ListRequestTypes")]
        public IEnumerable<RequestType> ListRequestTypes()
        {
            return _context.RequestTypes.ToList();
        }
        [HttpGet]
        [Route("ListRequestCategories")]
        public IEnumerable<ReqCategory> ListRequestCategories()
        {
            return _context.ReqCategories.ToList();
        }

        [HttpGet]
        [Route("ListRequestSubCategoriesByCategoryId/{categoryId}")]
        public IEnumerable<ReqSubCategory> ListRequestCategories(int categoryId)
        {
            return _context.ReqSubCategories.Where(a => a.ReqCategoryId == categoryId).ToList();
        }

        [HttpGet]
        [Route("ListRequestImpacts")]
        public IEnumerable<ReqImact> ListRequestImpacts()
        {
            return _context.ReqImacts.ToList();
        }
        [HttpGet]
        [Route("ListRequestPeriorities")]
        public IEnumerable<ReqPeriority> ListRequestPeriorities()
        {
            return _context.ReqPeriorities.ToList();
        }
        [HttpGet]
        [Route("ListRequestLevels")]
        public IEnumerable<RequestLevel> ListRequestLevels()
        {
            return _context.RequestLevels.ToList();
        }
        [HttpGet]
        [Route("ListRequestModes")]
        public IEnumerable<RequestMode> ListRequestModes()
        {
            return _context.RequestModes.ToList();
        }
        [HttpGet]
        [Route("ListRequestTypeStatus")]
        public IEnumerable<RequestTypeStatus> ListRequestTypeStatus()
        {
            return _context.RequestTypeStatuses.ToList();
        }

        [HttpGet]
        [Route("ListOrganizations")]
        public IEnumerable<Organization> ListOrganizations()
        {
            return _context.Organizations.ToList();
        }
        //[HttpGet]
        //[Route("ListUrgencies")]
        //public IEnumerable<Urgency> ListUrgencies()
        //{
        //    return _context.Urgencies.ToList();
        //}



        [HttpGet]
        [Route("ListTLByProjectId/{projectId}")]
        public IEnumerable<Employee> ListTLByProjectId(int projectId)
        {
            return (from emp in _context.Employees
                    join pte in _context.ProjectTeamEmployees on emp.Id equals pte.EmployeeId
                    where pte.ProjectId == projectId
                    && pte.PtepositionId == 2
                    select emp).ToList();
        }






        [HttpPost]
        [Route("CreateRequest")]
        public int CreateRequest(CreateRequestVM model)
        {
            var requestObj = model.CreateRequest();
            _context.TechRequests.Add(requestObj);
            _context.SaveChanges();
            int Id = requestObj.Id;

            var updatedObj = _context.TechRequests.Find(Id);
            updatedObj.ReqCode = "Req" + Id + "_" + DateTime.Today.Date.Day + DateTime.Today.Date.Month + DateTime.Today.Date.Year;
            _context.Entry(updatedObj).State = EntityState.Modified;
            _context.SaveChanges();


            //var lstPMTL = (from tech in _context.TechRequests
            //               join pte in _context.ProjectTeamEmployees on tech.ProjectId equals pte.ProjectId
            //               where tech.CategoryId == categoryId
            //               && pte.ProjectId == model.ProjectId
            //               select pte).ToList().GroupBy(a => a.ProjectId).ToList();


            // var lstPMTL = _context.ProjectTeamEmployees.Where(a => a.ProjectId == model.ProjectId).ToList();
            //if(lstPMTL.Count > 0)
            //{
            //    foreach (var item in lstPMTL)
            //    {
            //        if (item.PtepositionId == 1 || item.PtepositionId == 2)
            //        {
            //            var email = _context.Employees.Where(a => a.Id == item.EmployeeId).FirstOrDefault().Email;
            //            var title = _context.Projects.Where(a => a.Id == item.ProjectId).FirstOrDefault().Name;
            //            var brief = _context.Projects.Where(a => a.Id == item.ProjectId).FirstOrDefault().Discription;
            //            var smtpClient = new SmtpClient("smtp.gmail.com")
            //            {
            //                Port = 587, 
            //                UseDefaultCredentials = false,
            //                Credentials = new NetworkCredential("pineappleaziz@gmail.com", "p!ne@pple12679")
            //                 // EnableSsl = true

            //            };
            //            smtpClient.Send("pineappleaziz@gmail.com", email, title, brief);
            //        }
            //    }
            //}

            return Id;
        }

        [HttpPost]
        [Route("CreateRequestDetail")]
        public int CreateRequestDetail(CreateRequestDetailVM model)
        {
            var requestDetailObj = model.CreateRequestDetail();
            _context.RequestDetails.Add(requestDetailObj);
            _context.SaveChanges();
            return requestDetailObj.Id;
        }




        [Route("GetRequestById/{id}")]
        public async Task<EditRequestVM> GetRequestById(int id)
        {
            var requestObj = await _context.TechRequests.FindAsync(id);
            return requestObj.EditRequest();
        }



        [HttpPut]
        [Route("UpdateRequest")]
        public void UpdateRequest(EditRequestVM requestObj)
        {
            var updatedObj = requestObj.EditRequest();
            _context.Entry(updatedObj).State = EntityState.Modified;
            _context.SaveChanges();
        }




        [HttpDelete]
        [Route("DeleteRequest/{id}")]
        public void Delete(int id)
        {
            var requestObj = _context.TechRequests.Find(id);
            _context.TechRequests.Remove(requestObj);
            _context.SaveChanges();
        }


        [HttpDelete]
        [Route("DeleteRequestDetail/{id}")]
        public void DeleteRequestDetail(int id)
        {
            var requestDetailObj = _context.RequestDetails.Find(id);
            _context.RequestDetails.Remove(requestDetailObj);
            _context.SaveChanges();
        }
    }
}
