using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using slnTrackerSystem.Models;
using slnTrackerSystem.ViewModel.RoleVM;

namespace slnTrackerSystem.Controllers
{
    [EnableCors]
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {

        readonly TrackerDBContext _context;
        public RoleController(TrackerDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("ListRoles")]
        public IEnumerable<Role> Get()
        {
            return _context.Roles.ToList();
        }

        [HttpPost]
        [Route("CreateRole")]
        public int CreateRole(Role model)
        {
            _context.Roles.Add(model);
            _context.SaveChanges();
            return model.Id;
        }


        [Route("GetRoleById/{id}")]
        public async Task<Role> GetRoleById(int id)
        {
            return await _context.Roles.FindAsync(id);
        }

        [HttpDelete]
        [Route("DeleteRole/{id}")]
        public void DeleteRole(int id)
        {
            var roleObj = _context.Roles.Find(id);
            _context.Roles.Remove(roleObj);
            _context.SaveChanges();
        }

        [HttpPut]
        [Route("UpdateRole")]
        public void UpdateRole(Role roleObj)
        {
            _context.Entry(roleObj).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
