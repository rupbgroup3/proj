using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinalProject.Models
{
    public class Person_plan_TasksInEvent
    {
        public int PersonEmpCode { get; set; }
        public int plan_TasksInEventActual_EventBarcode { get; set; }
        public int plan_TasksInEventTaskTaskNo { get; set; }
        public string executionDate { get; set; }
        public double FromHour { get; set; }
        public double ToHour { get; set; }

        //method....

        public List<Person_plan_TasksInEvent> GetPerson_plan_TasksInEvent()
        {
            DBservices dbs = new DBservices();
            return dbs.GetPerson_plan_TasksInEvents();

        }



        public int Person_plan_TasksInEventInsert()
        {
            DBservices dbs = new DBservices();
            int numAffected = dbs.Person_plan_TasksInEventInserts(this);
            return numAffected;
        }



    }
}