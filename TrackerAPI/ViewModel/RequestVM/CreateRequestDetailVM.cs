using System;

namespace slnTrackerSystem.ViewModel.RequestVM
{
    public class CreateRequestDetailVM
    {
        public int? RequestId { get; set; }
        public int? StatusId { get; set; }
        public DateTime? PlannedStartDate { get; set; }
        public string PlannedStartTime { get; set; }
        public DateTime? PlannedEndDate { get; set; }
        public string PlannedEndTime { get; set; }
        public DateTime? ActualStartDate { get; set; }
        public string ActualStartTime { get; set; }
        public DateTime? ActualEndDate { get; set; }
        public string ActualEndTime { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ActualStarted { get; set; }
        public string ActualEnded { get; set; }
        public string PlannedStarted { get; set; }
        public string PlannedEnded { get; set; }
        public int? LoggedId { get; set; }
        public int? FromEmpId { get; set; }
        public int? ToEmpId { get; set; }
    }
}
