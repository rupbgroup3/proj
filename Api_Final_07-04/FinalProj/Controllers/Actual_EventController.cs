using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FinalProject.Models;

namespace FinalProj.Controllers
{
    public class Actual_EventController : ApiController
    {
        // GET api/<controller>
        //public IEnumerable<Actual_Event> Get()
        //{
        //    Actual_Event TP = new Actual_Event();
        //    return TP.GetActual_Event();
        //}

        // POST api/<controller>

        public IEnumerable<Actual_Event> Get()
        {
            Actual_Event AE = new Actual_Event();
            return AE.getActualEvent();
        }
        public void Post([FromBody]Actual_Event Tp)
        {
            Tp.Actual_EventInsert();
        }


        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete([FromBody]int value)
        {
            Actual_Event ET = new Actual_Event();
            ET.DeleteActualEvent(value);
        }
    }
}