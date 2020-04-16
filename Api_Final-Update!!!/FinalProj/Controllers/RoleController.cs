using FinalProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FinalProj.Controllers
{
    public class RoleController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<Role> GetRole()
        {
            Role r = new Role();
            return r.getRole();
        }



        // POST api/<controller>
        public void Post([FromBody]Role R)
        {
            R.RoleInsert();
        }


        // PUT api/<controller>/5

        public int Put(Role r)
        {
            return r.RoleUpdate(r);
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}