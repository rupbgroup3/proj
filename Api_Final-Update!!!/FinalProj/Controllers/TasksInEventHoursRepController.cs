using FinalProj.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FinalProj.Controllers
{
    public class TasksInEventHoursRepController : ApiController
    {
        // GET api/<controller>


        // שימוש בפונקציית פוסט שבעצם שולחת הפנייה לגט כדי להשתמש בפרמטרים מהריאקט בשביל הדוח שעות הספציפי למתנדב
        public IEnumerable<TasksInEventHoursRep> Post([FromBody]TasksInEventHoursRep t)
        {
           return t.GetTasksInEventHoursRep(t);
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