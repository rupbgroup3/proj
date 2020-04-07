using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinalProject.Models
{
    public class Task
    {
        public int TaskNo { get; set; }
        public string TaskName { get; set; }
        public string Description { get; set; }


        //method..


        public List<Task> getTask()
        {
            DBservices dbs = new DBservices();
            return dbs.getTasks();

        }

        public int insert()
        {
            DBservices dbs = new DBservices();
            int numAffected = dbs.taskInsert(this);
            return numAffected;
        }
        public int TaskDelete(Task t)
        {
            DBservices dbs = new DBservices();
            return dbs.DeleteTask(t);

        }
        public int TaskUpdate(Task t)
        {
            DBservices dbs = new DBservices();
            return dbs.UpdateTask(t);

        }
        



    }
}