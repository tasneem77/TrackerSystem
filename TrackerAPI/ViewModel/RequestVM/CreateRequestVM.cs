namespace slnTrackerSystem.ViewModel.RequestVM
{
    public class CreateRequestVM
    {


        public string Subject { get; set; }
        public string Note { get; set; }
        public string Description { get; set; }
        public string CreatedDate { get; set; }
        public string RespondDate { get; set; }
        public string CreatedTime { get; set; }
        public string RespondTime { get; set; }
        public string ScheduleStarted { get; set; }
        public string ScheduleEnded { get; set; }
        public string Started { get; set; }
        public string Ended { get; set; }
        public int? RequestTypeId { get; set; }
        public int? RequestStatusId { get; set; }
        public int? RequestModeId { get; set; }
        public int? RequestLevelId { get; set; }
        public int? UrgencyId { get; set; }
        public int? ImpactId { get; set; }
        public int? PeriorityId { get; set; }
        public int? CategoryId { get; set; }
        public int? ClientId { get; set; }
        public int? ProjectId { get; set; }
        public int? SubCategoryId { get; set; }
        public int? OrganizationId { get; set; }
    }
}
