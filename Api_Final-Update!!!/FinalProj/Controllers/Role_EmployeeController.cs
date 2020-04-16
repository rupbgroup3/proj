using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FinalProject.Models;

namespace FinalProj.Controllers
{
    public class Role_EmployeeController : ApiController
    {
        // GET api/<controller>/5
        public IEnumerable<Role_Employee> Get()
        {
            Role_Employee t = new Role_Employee();
            return t.getRole_Employee();
        }

        // POST api/<controller>
        public void Post([FromBody]Role_Employee t)
        {
            t.insertRole_Employee();
        }

        // PUT api/<controller>/5
        public int Put(Role_Employee Et)
        {
            return Et.UpdateRole_Employee(Et);
        }

        // DELETE api/<controller>/5
        public void Delete(Role_Employee ET)
        {
            ET.Delete_Role_Employee(ET);
        }
    }
}