using FinalProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FinalProj.Controllers
{
    public class skillsController : ApiController
    {
        // GET api/values
        //public IEnumerable<skills> Get()
        //{
        //    return null;
        //}


        // GET api/<controller>/5
        public IEnumerable<skills> Get()
        {
            skills skill = new skills();
            return skill.getskill();
        }

        // POST api/values
        //public void Post([FromBody]string value)
        public void Post([FromBody]skills skill)
        {
            skill.insert();
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