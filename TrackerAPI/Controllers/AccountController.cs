using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using slnTrackerSystem.Helpers;
using slnTrackerSystem.Models;
using slnTrackerSystem.ViewModel;
using slnTrackerSystem.ViewModel.UserVM;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace slnTrackerSystem.Controllers
{
    [EnableCors]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        readonly TrackerDBContext _context;
        public AccountController(TrackerDBContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("RegisterUser")]
        public IActionResult RegisterUser(CreateUserVM model)
        {
            var lstUsers = _context.Users.Where(a => a.Email == model.Email).ToList();
            if (lstUsers.Count == 0)
            {
                User userObj = new User
                {
                    Email = model.Email,
                    Username = model.Username,
                    Password = model.Password

                };
                _context.Users.Add(userObj);
                _context.SaveChanges();


                var empId = userObj.Id;
                UserRole userRoleObj = new UserRole
                {
                    UserId = empId,
                    RoleId = model.RoleId
                };
                _context.UserRoles.Add(userRoleObj);
                _context.SaveChanges();


                var lstEmployees = _context.Employees.Where(a => a.Email == model.Email).ToList();
                if (lstEmployees.Count == 0)
                {
                    Employee empObj = new Employee
                    {
                        Email = model.Email,
                        Username = model.Username,
                        Name = model.Username,
                        Password = model.Password,
                        UserId = empId,
                        TeamId = model.TeamId,
                        ParentId = 0,
                        Code = "user_" + empId
                    };
                    _context.Employees.Add(empObj);
                    _context.SaveChanges();
                    return Ok(new Response { Status = "Success", Message = "User created successfully!" });
                }
                else
                {
                    return Ok(new Response { Status = "Success", Message = "User already exist" });
                }

            }
            else if (lstUsers.Count > 0)
            {
                return Ok(new Response { Status = "Success", Message = "User already exist" });
            }
            else
            {
                return Ok(new Response { Status = "User Exist", Message = "Error" });
            }
        }


        [HttpPost]
        [Route("Login")]
        public LogInVM Login(User model)
        {
            LogInVM userObj = new LogInVM();
            var lstUsers = _context.Users.Where(a => a.Email == model.Email && a.Password == model.Password).ToList();
            if (lstUsers.Count > 0)
            {
                var roleName = _context.UserRoles.Where(a => a.UserId == lstUsers[0].Id).Select(x => x.Role.Name).FirstOrDefault();
                userObj = new LogInVM
                {
                    Email = lstUsers[0].Email,
                    Username = lstUsers[0].Username,
                    RoleName = roleName,
                    UserId = lstUsers[0].Id
                };
            }
            //  SessionExtensions.SetString(HttpContext.Session,"roleName", userObj.RoleName);
            // SessionHelper.SetObjectAsJson(HttpContext.Session, "userObj", userObj);
            return userObj;
        }



        [HttpPost]
        [Route("ListUserRoles")]
        public List<IndexUserRoleVM.GetData> ListUserRoles()
        {
            var lstUserRoles = (from user in _context.Users
                                join userrole in _context.UserRoles on user.Id equals userrole.UserId
                                join role in _context.Roles on userrole.RoleId equals role.Id
                                select new IndexUserRoleVM.GetData
                                {
                                    Id = userrole.Id,
                                    UserName = user.Username,
                                    RoleName = role.Name,
                                    Email = user.Email
                                }).ToList();
            return lstUserRoles;

        }


        [HttpDelete]
        [Route("DeleteUserROle/{id}")]
        public void DeleteUserROle(int id)
        {
            var usrRoleObj = _context.UserRoles.Find(id);
            _context.UserRoles.Remove(usrRoleObj);
            _context.SaveChanges();
        }


        //[Route("GetRoleById/{id}")]
        //public async Task<UserRole> GetRoleById(int id)
        //{
        //    return await _context.Roles.FindAsync(id);
        //}



        //[HttpPut]
        //[Route("UpdateUserRole")]
        //public void UpdateUserRole(UserRole roleObj)
        //{
        //    _context.Entry(roleObj).State = EntityState.Modified;
        //    _context.SaveChanges();
        //}



    }
}
