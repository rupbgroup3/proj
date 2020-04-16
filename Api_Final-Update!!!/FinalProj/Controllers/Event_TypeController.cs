using FinalProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FinalProj.Controllers
{
    public class Event_TypeController : ApiController
    {
        public IEnumerable<Event_Type> Get()
        {
            Event_Type Et = new Event_Type();
            return Et.getEvent_Type();
        }

        // POST api/<controller>
        public void Post([FromBody]Event_Type Et)
        {
            Et.InsertEvent_Type();
        }

        public int Put(Event_Type Et)
        {
           return    Et.UpdateEvent_Type(Et);
        }

        // DELETE api/<controller>/5
        public void Delete(Event_Type ET)
        {
            ET.DeleteEvent_Type(ET);
        }
    }
}