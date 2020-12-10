using slnTrackerSystem.Models;
using slnTrackerSystem.ViewModel.RequestVM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace slnTrackerSystem.Mappers
{
    public static class RequestMapper
    {
       readonly static TrackerDBContext db = new TrackerDBContext();

        public static List<IndexRequestVM.GetData> MapIndexViewModel(this List<TechRequest> requests)
        {
            return requests.Select(item => new IndexRequestVM.GetData
            {
                Id = item.Id,
                Subject = item.Subject,
                PeriorityId = item.PeriorityId,
                Started = item.CreatedDate.Value.ToShortDateString(),
                StatusName = db.RequestTypeStatuses.Where(a => a.Id == item.RequestStatusId).FirstOrDefault().Name,
                ReqCode = item.ReqCode
            }).ToList();
        }

        public static List<IndexRequestDetailVM.GetData> MapRequestDetailsViewModel(this List<RequestDetail> requests)
        {
            return requests.Select(item => new IndexRequestDetailVM.GetData
            {
                Id = item.Id,
                Title = item.Title,
                StatusName = db.RequestTypeStatuses.Where(a => a.Id == item.StatusId).FirstOrDefault().Name,
                ActualStartDateTime = item.ActualStartDate.Value.ToShortDateString() + " " + item.ActualStartTime.Value.ToString(),
                PlannedStartDateTime = item.PlannedStartDate.Value.ToShortDateString() + " " + item.PlannedStartTime.Value.ToString(),

                ActualEndDateTime = item.ActualEndDate.Value.ToShortDateString() + " " + item.ActualEndTime.Value.ToString(),
                PlannedEndDateTime = item.PlannedEndDate.Value.ToShortDateString() + " " + item.PlannedEndTime.Value.ToString(),

                ReqCode = db.TechRequests.Where(a => a.Id == item.RequestId).FirstOrDefault().ReqCode
            }).ToList();
        }






        public static List<IndexRequestVM2.GetData> MapIndexViewModel2(this List<TechRequest> requests)
        {
            string bgcolor = "";
            var lstSettings = db.CalendarSettings.Where(a => a.Name == "BgActualRequest").ToList();
            if (lstSettings.Count > 0)
            {
                bgcolor = lstSettings[0].Value;
            }

            return requests.Select(item => new IndexRequestVM2.GetData
            {
                id = item.Id,
                title = item.Subject,
                start = item.Started,
                end = item.Ended,
                allDay = false,
                color = bgcolor,
                textColor = "#000"

            }).ToList();
        }


        public static List<IndexRequestVM2.GetData> MapActualCalendar(this List<RequestDetail> requestDetails)
        {
            string bgcolor = "";
            var lstSettings = db.CalendarSettings.Where(a => a.Name == "BgActualRequest").ToList();
            if(lstSettings.Count > 0)
            {
                bgcolor = lstSettings[0].Value;
            }

            return requestDetails.Select(item => new IndexRequestVM2.GetData
            {
                id = item.Id,
                title = item.Title,
                start = item.ActualStarted,
                end = item.ActualEnded,
                allDay = false,
                color=bgcolor,
                textColor="#000"

            }).ToList();
        }

        public static List<IndexRequestVM2.GetData> MapPlannedCalendar(this List<RequestDetail> requestDetails)
        {
            string bgcolor = "";
            var lstSettings = db.CalendarSettings.Where(a => a.Name == "BgPlannedRequest").ToList();
            if (lstSettings.Count > 0)
            {
                bgcolor = lstSettings[0].Value;
            }

            return requestDetails.Select(item => new IndexRequestVM2.GetData
            {
                id = item.Id,
                title = item.Title,
                start = item.PlannedStarted,
                end = item.PlannedEnded,
                allDay = false,
                color = bgcolor,
                textColor = "#000"

            }).ToList();
        }


        public static TechRequest CreateRequest(this CreateRequestVM model)
        {
            var EmployeeObj = new TechRequest
            {
                Subject = model.Subject,
                Note = model.Note,
                Description = model.Description,
                CreatedDate = DateTime.Parse(model.CreatedDate),
                CreatedTime = TimeSpan.Parse(model.CreatedTime),
                Started = model.Started,
                Ended = model.Ended,
                RequestTypeId = model.RequestTypeId,
                RequestStatusId = model.RequestStatusId,
                RequestModeId = model.RequestModeId,
                RequestLevelId = model.RequestLevelId,
                ImpactId = model.ImpactId,
                PeriorityId = model.PeriorityId,
                CategoryId = model.CategoryId,
                ClientId = model.ClientId,
                ProjectId = model.ProjectId,
                OrganizationId = (int)model.OrganizationId,
                SubCategoryId = model.SubCategoryId

            };
            return EmployeeObj;
        }

        static string dtActualStartTime, dtActualEndTime, dtPlannedStartTime, dtPlannedEndTime;
        public static RequestDetail CreateRequestDetail(this CreateRequestDetailVM model)
        {

            if (model.ActualStartTime != "")
                dtActualStartTime = DateTime.Parse(model.ActualStartTime).ToString("HH:mm:ss");
            if (model.ActualEndTime != "")
                dtActualEndTime = DateTime.Parse(model.ActualEndTime).ToString("HH:mm:ss");


            if (model.PlannedStartTime != "")
                dtPlannedStartTime = DateTime.Parse(model.PlannedStartTime).ToString("HH:mm:ss");
            if (model.PlannedEndTime != "")
                dtPlannedEndTime = DateTime.Parse(model.PlannedEndTime).ToString("HH:mm:ss");




            var RequestDetailObj = new RequestDetail
            {
                RequestId = model.RequestId,
                StatusId = model.StatusId,
                PlannedStartDate = model.PlannedStartDate,
                PlannedStartTime = TimeSpan.Parse(dtPlannedStartTime),
                PlannedEndDate = model.PlannedEndDate,
                PlannedEndTime = TimeSpan.Parse(dtPlannedEndTime),
                ActualStartDate = model.ActualStartDate,
                ActualStartTime = TimeSpan.Parse(dtActualStartTime),
                ActualEndDate = model.ActualEndDate,
                ActualEndTime = TimeSpan.Parse( dtActualEndTime),
                Title = model.Title,
                Description = model.Description,
                ActualStarted = model.ActualStarted,
                ActualEnded = model.ActualEnded,
                PlannedStarted = model.PlannedStarted,
                PlannedEnded = model.PlannedEnded,
                LoggedId= model.LoggedId,
                FromEmpId= model.FromEmpId,
                ToEmpId = model.ToEmpId
            };
            return RequestDetailObj;
        }


        public static EditRequestVM EditRequest(this TechRequest model)
        {
            var requestObj = new EditRequestVM
            {
                Id = model.Id,
                Subject = model.Subject,
                Note = model.Note,
                Description = model.Description,
                CreatedDate = model.CreatedDate.ToString(),
                CreatedTime = model.CreatedTime.ToString(),
                Started = model.Started,
                Ended = model.Ended,
                RequestTypeId = model.RequestTypeId,
                RequestStatusId = model.RequestStatusId,
                RequestModeId = model.RequestModeId,
                RequestLevelId = model.RequestLevelId,
                ImpactId = model.ImpactId,
                PeriorityId = model.PeriorityId,
                CategoryId = model.CategoryId,
                ClientId = model.ClientId,
                ProjectId = model.ProjectId,
                OrganizationId = model.OrganizationId,
                SubCategoryId = model.SubCategoryId,
                ReqCode = model.ReqCode

            };
            return requestObj;
        }


        public static TechRequest EditRequest(this EditRequestVM model)
        {
            var requestObj = new TechRequest
            {
                Id = model.Id,
                Subject = model.Subject,
                Note = model.Note,
                Description = model.Description,
                ReqCode = model.ReqCode,
                CreatedDate = DateTime.Parse(model.CreatedDate),
                CreatedTime = TimeSpan.Parse(model.CreatedTime),
                Started = model.Started,
                Ended = model.Ended,
                RequestTypeId = model.RequestTypeId,
                RequestStatusId = model.RequestStatusId,
                RequestModeId = model.RequestModeId,
                RequestLevelId = model.RequestLevelId,
                ImpactId = model.ImpactId,
                PeriorityId = model.PeriorityId,
                CategoryId = model.CategoryId,
                ClientId = model.ClientId,
                ProjectId = model.ProjectId,
                OrganizationId = model.OrganizationId,
                SubCategoryId = model.SubCategoryId
            };
            return requestObj;
        }
    }
}
