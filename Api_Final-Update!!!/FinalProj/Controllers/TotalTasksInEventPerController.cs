using FinalProj.Models.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FinalProj.Controllers
{
    public class TotalTasksInEventPerController : ApiController
    {
        // GET api/<controller>

        // הגט נועד לדוח השעות הכולל של כל המתנדבים/ פעילים באגודה ומביא לנו את כל המשימות שמשוייכות לאירוע
        public IEnumerable<TotalTasksInEventPer> Get()
        {
            TotalTasksInEventPer t = new TotalTasksInEventPer();
            return t.GetTotalTasksInEventPer();
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