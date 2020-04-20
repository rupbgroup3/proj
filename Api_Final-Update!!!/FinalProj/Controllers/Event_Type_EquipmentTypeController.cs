using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FinalProject.Models;

namespace FinalProj.Controllers
{
    public class Event_Type_EquipmentTypeController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<Event_Type_EquipmentType> Get()
        {
            Event_Type_EquipmentType ET = new Event_Type_EquipmentType();
            return ET.GetEvent_Type_EquipmentType();
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>

        public void Post([FromBody]Event_Type_EquipmentType Et)
        {
            Et.InsertEvent_TypeEquipmentType();
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(Event_Type_EquipmentType ET)
        {
            ET.DeleteEvent_Type_EquipmentType(ET);
        }
    }
}