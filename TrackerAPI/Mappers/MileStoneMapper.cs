using slnTrackerSystem.Models;
using slnTrackerSystem.ViewModel.MileStoneVM;
using System;
using System.Collections.Generic;
using System.Linq;


namespace slnTrackerSystem.Mappers
{
    public static class MileStoneMapper
    {
        // readonly static TrackerDBContext db = new TrackerDBContext();
        public static MileStone CreateMileStone(this CreateMileStoneVM model)
        {
            var dtStartTime = DateTime.Parse(model.StartTime).ToString("HH:mm:ss");
            var dtEndTime = DateTime.Parse(model.EndTime).ToString("HH:mm:ss");

            var MileStoneObj = new MileStone
            {
                Title = model.Title,
                Description = model.Description,
                StartDate = DateTime.Parse(model.StartDate.ToString()),
                EndDate = DateTime.Parse(model.EndDate.ToString()),
                StartTime = TimeSpan.Parse(dtStartTime),
                EndTime = TimeSpan.Parse(dtEndTime),
                ProjectId = int.Parse(model.ProjectId.ToString())
            };
            return MileStoneObj;
        }

        public static EditMileStoneVM EditMileStone(this MileStone model)
        {

            var obj = new EditMileStoneVM
            {
                Id = model.Id,
                Title = model.Title,
                Description = model.Description,
                StartDate = DateTime.Parse(model.StartDate.ToString()).ToShortDateString(),
                EndDate = DateTime.Parse(model.EndDate.ToString()).ToShortDateString(),
                StartTime = model.StartTime.ToString(),
                EndTime = model.EndTime.ToString(),
                ProjectId = int.Parse(model.ProjectId.ToString())
            };
            return obj;
        }


        public static MileStone EditMileStone(this EditMileStoneVM model)
        {

            var dtStartTime = DateTime.Parse(model.StartTime).ToString("HH:mm:ss");
            var dtEndTime = DateTime.Parse(model.EndTime).ToString("HH:mm:ss");
            var obj = new MileStone
            {
                Id = model.Id,
                Title = model.Title,
                Description = model.Description,
                StartDate = DateTime.Parse(model.StartDate.ToString()),
                EndDate = DateTime.Parse(model.EndDate.ToString()),
                StartTime = TimeSpan.Parse(dtStartTime),
                EndTime = TimeSpan.Parse(dtEndTime),
                ProjectId = int.Parse(model.ProjectId.ToString())
            };
            return obj;
        }


        public static List<ListMileStoneVM.GetData> IndexMileStoneViewModel(this List<MileStone> mileStones)
        {
            List<ListMileStoneVM.GetData> lst = new List<ListMileStoneVM.GetData>();
            var lstMileStones = mileStones.ToList();
            foreach (var item in lstMileStones)
            {

                ListMileStoneVM.GetData obj = new ListMileStoneVM.GetData();
                obj.Id = item.Id;
                obj.Title = item.Title;
                obj.Description = item.Description;
                obj.StartDate = item.StartDate.Value.ToShortDateString();
                obj.EndDate = item.EndDate.Value.ToShortDateString();



                DateTime time = DateTime.Today.Add(item.StartTime.Value);
                obj.StartTime = time.ToString("hh:mm tt");

                DateTime time2 = DateTime.Today.Add(item.EndTime.Value);
                obj.EndTime = time2.ToString("hh:mm tt");

                lst.Add(obj);
            }

            return lst;
            //return mileStones.Select(item => new ListMileStoneVM.GetData
            //{
            //    Id = item.Id,
            //    Title = item.Title,
            //    Description = item.Description,
            //    StartDate =item.StartDate.Value.ToShortDateString(),
            //    EndDate =item.EndDate.Value.ToShortDateString(),
            //    StartTime = item.StartTime.Value.ToString("HH:mm tt"),
            //    EndTime = item.EndTime.Value.ToString("HH:mm tt"),
            //    ProjectId = int.Parse(item.ProjectId.ToString())
            //}).ToList();
        }
    }
}
