using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using slnTrackerSystem.Models;
using slnTrackerSystem.ViewModel.EmployeeVM;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace slnTrackerSystem.Mappers
{
    public static class EmployeeMapper
    {
       
        readonly static TrackerDBContext _context = new TrackerDBContext();
        public static List<IndexEmployeeVM.GetData> MapIndexViewModel(this List<Employee> employees)
        {
            return employees.Select(item => new IndexEmployeeVM.GetData
            {
                Id = item.Id,
                Name = item.Name,
                Email = item.Email,
                Phone = item.Phone,
                TeamName = _context.Teams.Where(a => a.Id == item.TeamId).FirstOrDefault().Name,
                EmpImg=item.EmpImg != null? Path.Combine("UploadedImages/imgEmployees/", item.EmpImg): "UploadedImages/imgEmployees/user.png"
            }).ToList();
        }


        public static Employee CreateEmployee(this CreateEmployeeVM model)
        {
            var EmployeeObj = new Employee
            {

                Name = model.Name,
                Address= model.Address,
                Dob=model.Dob,
                Email= model.Email,
                Phone=model.Phone,
                TeamId= model.TeamId,
                WhatsApp=model.WhatsApp,
                EmpImg=model.EmpImg
            };
            return EmployeeObj;
        }


        //public static EditEmployeeVM EditEmployee(this Employee EmployeeObj)
        //{
        //    EditEmployeeVM model = new EditEmployeeVM
        //    {
        //        Id = EmployeeObj.Id,
        //        Name = EmployeeObj.Name
        //    };
        //    return model;
        //}

        public static Employee EditEmployee(this EditEmployeeVM model)
        {
            var obj = new Employee
            {
                Id = model.Id,
                Name = model.Name,
                Address = model.Address,
                Dob = model.dob,
                Email = model.Email,
                Phone = model.Phone,
                TeamId = model.TeamId,
                WhatsApp = model.WhatsApp,
                EmpImg = model.EmpImg
            };
            return obj;
        }


    }
}
