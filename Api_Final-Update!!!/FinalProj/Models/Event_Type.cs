using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinalProject.Models
{
    public class Event_Type
    {
        public int EventCode { get; set; }
        public string EventName { get; set; }

        //Method......
        public List<Event_Type> getEvent_Type()
        {
            DBservices dbs = new DBservices();
            return dbs.GetEvent_Type();

        }
        public int InsertEvent_Type()
        {
            DBservices dbs = new DBservices();
            int numAffected = dbs.Event_TypeInsert(this);
            return numAffected;
        }
        public int UpdateEvent_Type(Event_Type Et)
        {
            DBservices dbs = new DBservices();
            return dbs.Event_TypeUpdate(Et);
            
        }

        public int DeleteEvent_Type(Event_Type P)
        {
            DBservices dbs = new DBservices();
            return dbs.DeleteEvent_Type(P);

        }
    
    }
}