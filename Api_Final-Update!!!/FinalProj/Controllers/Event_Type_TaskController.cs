using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FinalProject.Models;

namespace FinalProj.Controllers
{
    public class Event_Type_TaskController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<Event_Type_Task> Get()
        {
            Event_Type_Task ET = new Event_Type_Task();
            return ET.GetEvent_Type_Task();
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
  
        public void Post([FromBody]Event_Type_Task Et)
        {
            Et.InsertEvent_TypeTask();
        }

        // PUT api/<controller>/5

        public void Put(int id, [FromBody]string value)
        {
        }
        // DELETE api/<controller>/5
        public void Delete(Event_Type_Task ET)
        {
            ET.DeleteEvent_Type_Task(ET);
        }
    }
}