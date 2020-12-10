using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using slnTrackerSystem.Models;

// For more information on enabling Web API for empty Clients, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace slnTrackerSystem.Controllers
{
    [EnableCors]
    [Route("api/[controller]")]
    [ApiController]
    //[CustomAuthenticationFilter]  
    public class ClientController : ControllerBase
    {
        readonly TrackerDBContext _context;
        public ClientController(TrackerDBContext context)
        {
            _context = context;
        }

        // [CustomAuthorize("Normal", "SuperAdmin")]  
        [HttpGet]
        [Route("ListClients")]
        public IEnumerable<Client> Get()
        {
            return _context.Clients.ToList();

        }


        [Route("GetClientById/{id}")]
        public async Task<Client> Get(int id)
        {
            return await _context.Clients.FindAsync(id);
        }


        [HttpPost]
        [Route("CreateClient")]
        public int CreateClient(Client model)
        {
            _context.Clients.Add(model);
            int Id = _context.SaveChanges();
            return Id;
        }

        //[HttpPost]
        //[Route("UploadClientImage")]
        //public ActionResult UploadClientImage(IFormFile file)
        //{
        //    //D:\Ekram\Projects\slnTrackerSystem\UploadedImages\ImgClients\

        //    string path = Path.Combine(Directory.GetCurrentDirectory(), "UploadedImages/ImgClients/", file.FileName);
        //    using (Stream stream = new FileStream(path, FileMode.Create))
        //    {
        //        file.CopyTo(stream);
        //    }
        //    return StatusCode(StatusCodes.Status201Created);
        //}



        [HttpPut]
        [Route("UpdateClient")]
        public void UpdateClient(Client ClientObj)
        {
           // var updatedObj = _context.Clients.Find(ClientObj.Id);
            _context.Entry(ClientObj).State = EntityState.Modified;
            _context.SaveChanges();
        }


        [HttpDelete]
        [Route("DeleteClient/{id}")]
        public void Delete(int id)
        {
            var ClientObj = _context.Clients.Find(id);
            _context.Clients.Remove(ClientObj);
            _context.SaveChanges();
        }
    }
}
