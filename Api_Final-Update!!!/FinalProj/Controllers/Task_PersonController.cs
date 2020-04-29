using FinalProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FinalProj.Controllers
{
    public class Task_PersonController : ApiController
    {
        // GET api/<controller>

        public IEnumerable<Task_Person> Get()
        {
            Task_Person TP = new Task_Person();
            return TP.GetTask_Person();
        }

        // POST api/<controller>
        public void Post([FromBody]Task_Person Tp)
        {
            Tp.Actual_TaskInsert();
        }

        public int Delete(Task_Person Et)
        {
            return Et.DeleteTask_Person(Et);
        }


    }
}