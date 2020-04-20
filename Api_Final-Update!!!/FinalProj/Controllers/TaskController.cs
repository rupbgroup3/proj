using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FinalProject.Models;

namespace FinalProj.Controllers
{
    public class TaskController : ApiController
    {

        // GET api/<controller>/5
        public IEnumerable<Task> Get()
        {
            Task t = new Task();
            return t.getTask();
        }

        // POST api/<controller>
        public void Post([FromBody]Task t)
        {
            t.insert();
        }

        // PUT api/<controller>/5
        [HttpPut]
        [Route("api/Task/DeleteTask")]
        public int Put(Task t)
        {
            return t.TaskDelete(t);
        }

        // DELETE api/<controller>/5
        [HttpDelete]
        [Route("api/Task/UpdateTask")]
        public int Delete(Task T)
        {
          return T.TaskUpdate(T);
        }
    }
}