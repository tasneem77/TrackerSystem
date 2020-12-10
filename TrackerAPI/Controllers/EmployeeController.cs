using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using slnTrackerSystem.Mappers;
using slnTrackerSystem.Models;
using slnTrackerSystem.ViewModel.EmployeeVM;

// For more information on enabling Web API for empty Employees, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace slnTrackerSystem.Controllers
{
    [EnableCors]
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {

        //  readonly IHostingEnvironment _env;
        readonly TrackerDBContext _context;
        public EmployeeController(TrackerDBContext context)
        {
            _context = context;
            //_env = env;
        }

        [HttpGet]
        [Route("ListEmployees")]
        public IEnumerable<IndexEmployeeVM.GetData> Get()
        {
            return _context.Employees.ToList().MapIndexViewModel();

        }


        [HttpGet]
        [Route("CountEmployees")]
        public int CountEmployees()
        {
            return _context.Employees.ToList().Count;

        }



        [HttpGet]
        [Route("ListEmployeesByTeamId/{teamId}")]
        public IEnumerable<Employee> ListEmployeesByTeamId(int teamId)
        {
            return _context.Employees.Where(a => a.TeamId == teamId).ToList();

        }

        [Route("GetEmployeeById/{id}")]
        public async Task<Employee> Get(int id)
        {
            return await _context.Employees.FindAsync(id);
        }

        //[HttpGet]
        //[Route("GetEmployeeImage/{empImg}")]
        //public IActionResult ImageGet(string empImg)
        //{
        //    if (empImg == null)
        //        return Content("filename not present");
        //  var path = _env.WebRootFileProvider.GetFileInfo("/UploadedImages/ImgEmployees/" + empImg)?.PhysicalPath;
        //    var memory = new MemoryStream();
        //    using (var stream = new FileStream(path, FileMode.Open))
        //    {
        //        stream.CopyTo(memory);
        //    }
        //    var contentType = "APPLICATION/octet-stream";
        //    return File(memory, contentType, Path.GetFileName(path));
        //}





        [HttpPost]
        [Route("CreateEmployee")]
        public int CreateEmployee(CreateEmployeeVM model)
        {
            var lstEmployees = _context.Employees.Where(a => a.Email == model.Email).ToList();
            if (lstEmployees.Count > 0)
            {
                var lstUsers = _context.Users.Where(a => a.Email == model.Email).ToList();
                if (lstUsers.Count > 0)
                {
                    return 0;
                }
                else
                {
                    return -1;
                }
            }
            else if (lstEmployees.Count == 0)
            {
                return -1;
            }

            var EmployeeObj = model.CreateEmployee();
            _context.Employees.Add(EmployeeObj);
            int Id = _context.SaveChanges();
            return Id;

        }

        [HttpPost]
        [Route("UploadEmployeeImage")]
        public ActionResult UploadEmployeeImage(IFormFile file)
        {
            string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/UploadedImages/ImgEmployees/", file.FileName);
            using (Stream stream = new FileStream(path, FileMode.Create))
            {
                file.CopyTo(stream);
            }
            return StatusCode(StatusCodes.Status201Created);
        }



        [HttpPut]
        [Route("UpdateEmployee")]
        public void UpdateEmployee(EditEmployeeVM EmployeeObj)
        {
            var updatedObj = EmployeeObj.EditEmployee();
            _context.Entry(updatedObj).State = EntityState.Modified;
            _context.SaveChanges();
        }


        [HttpDelete]
        [Route("DeleteEmployee/{id}")]
        public void Delete(int id)
        {
            var EmployeeObj = _context.Employees.Find(id);
            _context.Employees.Remove(EmployeeObj);
            _context.SaveChanges();
        }
    }
}
