using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinalProj.Models.DAL
{
    public class TotalTasksInEventPer
    {
        public string TaskName { get; set; }
        public string executionDate { get; set; }
        public double FromHour { get; set; }
        public double ToHour { get; set; }
        public int PersonEmpCode { get; set; }
        public string EmpFirstName { get; set; }
        public string EmpLastName { get; set; }
        public int plan_TasksInEventActual_EventBarcode { get; set; }
        public int plan_TasksInEventTaskTaskNo { get; set; }

        // נועד לדוח השעות הכולל של כל המתנדבים/ פעילים באגודה ומביא לנו את כל המשימות בתוך אירוע
        public List<TotalTasksInEventPer> GetTotalTasksInEventPer()
        {
            DBservices dbs = new DBservices();
            return dbs.GetTotalTasksInEventPer();

        }
        
    }
}