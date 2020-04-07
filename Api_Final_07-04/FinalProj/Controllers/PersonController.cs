using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FinalProject.Models;

namespace FinalProj.Controllers
{
    public class PersonController : ApiController
    {
        // GET api/<controller>


        // GET api/<controller>/5
        [HttpGet]
        [Route("api/Person")]
        public IEnumerable<Person> Get()
        {
            Person p = new Person();
            return p.getPerson();
        }

        // POST api/<controller>
        [HttpPost]
        [Route("api/Person")]
        public void Post([FromBody] Person p)
        {
            p.insert();
        }

        //Our Delete person method (works with Put to set Nulls)
        // PUT api/<controller>/5
        [HttpPut]
        [Route("api/PersonDelete")]
        public int Put(Person P)
        {
            return P.DeletePerson(P);
        }

        //Our Update person method
        // DELETE api/<controller>/5
        [HttpDelete]
        [Route("api/UpdatePerson")]
        public int Delete (Person p)
        {
            return p.UpdatePerson(p);
        }
    }
}