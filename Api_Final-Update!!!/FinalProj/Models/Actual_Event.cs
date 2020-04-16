using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinalProject.Models
{
    public class Actual_Event
    {
        public int Barcode { get; set; }
        public string date { get; set; }
        public double FromHour { get; set; }
        public double ToHour { get; set; }
        public int Event_TypeEventCode { get; set; }
        public string Location { get; set; }
        public int EmployeeEmpCode { get; set; }

        //Method........


        public List<Actual_Event> getActualEvent()
        {
            DBservices dbs = new DBservices();
            return dbs.getActualEvent();

        }

        public int PutActual_Event(Actual_Event AE)
        {
            DBservices dbs = new DBservices();
            return dbs.PutActual_Event(AE);

        }

        public int Actual_EventInsert()
        {
            DBservices dbs = new DBservices();
            int numAffected = dbs.InsertActual_Event(this);
            return numAffected;
        }



        public int DeleteActualEvent( int ActualEventId)
        {
            DBservices dbs = new DBservices();
            return dbs.DeleteActualEvent(ActualEventId);

        }


    }
}