using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinalProject.Models
{
    public class Event_Type_Task
    {
     
        public int Event_TypeEventCode { get; set; }
        public int TaskTaskNo { get; set; }
        //Method...


        public int InsertEvent_TypeTask()
        {
            DBservices dbs = new DBservices();
            int numAffected = dbs.taskInsertEventType(this);
            return numAffected;
        }

        public List<Event_Type_Task> GetEvent_Type_Task()
        {
            DBservices dbs = new DBservices();
            return dbs.GetEvent_Type_Task();

        }

        public int DeleteEvent_Type_Task(Event_Type_Task P)
        {
            DBservices dbs = new DBservices();
            return dbs.DeleteEvent_Type_Task(P);

        }

    }
}