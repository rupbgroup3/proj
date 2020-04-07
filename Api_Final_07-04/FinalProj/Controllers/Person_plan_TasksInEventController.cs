using FinalProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FinalProj.Controllers
{
    public class Person_plan_TasksInEventController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<Person_plan_TasksInEvent> Get()
        {
            Person_plan_TasksInEvent TP = new Person_plan_TasksInEvent();
            return TP.GetPerson_plan_TasksInEvent();
        }

        // POST api/<controller>
        public void Post([FromBody]Person_plan_TasksInEvent Tp)
        {
            Tp.Person_plan_TasksInEventInsert();
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