using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FinalProj.Models;

namespace FinalProj.Controllers
{
    public class EmpInfoRolesController : ApiController
    {
        // GET api/<controller>

        public IEnumerable<EmpInfoRoles> Get()
        {
            EmpInfoRoles TP = new EmpInfoRoles();
            return TP.GetEmpInfoRoles();
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}