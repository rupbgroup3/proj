using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinalProject.Models
{
    public class Task_Person
    {
        public int TaskTaskNo { get; set; }
        public int PersonEmpCode { get; set; }
        public string exceutionDate { get; set; } 
        public double FromHour { get; set; }
        public double ToHour { get; set; }
        public bool ReportedByPerson { get; set; }
        public bool ApprovedByManager { get; set; }




        //Method...

        
             public List<Task_Person> GetTask_Person()
        {
            DBservices dbs = new DBservices();
            return dbs.GetTasks_Persons();

        }



        public int Actual_TaskInsert ()
        {
            DBservices dbs = new DBservices();
            int numAffected = dbs.InsertActual_Task(this);
            return numAffected;
        }


    }
}