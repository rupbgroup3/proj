using FinalProj.Models.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FinalProj.Controllers
{
    public class TotalTasksPerController : ApiController
    {
        // GET api/<controller>
        // GET api/<controller>/5

        // הגט נועד לדוח השעות הכולל של כל המתנדבים/ פעילים באגודה ומביא לנו את כל המשימות שאינן משוייכות לאירוע

        public IEnumerable<TotalTasksPer> Get()
        {
            TotalTasksPer t = new TotalTasksPer();
            return t.GetTotalTasksPer();
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