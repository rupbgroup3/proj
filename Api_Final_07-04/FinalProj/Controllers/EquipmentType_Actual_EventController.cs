using FinalProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FinalProj.Controllers
{
    public class EquipmentType_Actual_EventController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<EquipmentType_Actual_Event> Get()
        {
            EquipmentType_Actual_Event t = new EquipmentType_Actual_Event();
            return t.getEquipmentType_Actual_Event();
        }

        // POST api/<controller>
        public void Post([FromBody]EquipmentType_Actual_Event t)
        {
            t.insertEquipmentType_Actual_Event();
        }

        // Delete api/<controller>/5
        public int Delete(EquipmentType_Actual_Event Et)
        {
            return Et.DeleteEquipmentType_Actual_Event(Et);
        }

        // DELETE api/<controller>/5
        //public void Delete(EquipmentType_Actual_Event ET)
        //{
        //    ET.DeleteEquipmentType_Actual_Event(ET);
        //}
    }
}