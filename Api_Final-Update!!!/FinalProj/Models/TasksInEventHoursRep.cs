using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinalProj.Models
{
    public class TasksInEventHoursRep
    {
        public int PersonEmpCode { get; set; }
        public double TotalTasksInEventHours { get; set; }
        public string EmpFirstName { get; set; }
        public string EmpLastName { get; set; }
        public string DepartmentName { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }

        //בשביל הדוח שעות הספציפי למתנדב שימוש בגט עם הפרמטרים שקיבלנו מהריאקט
        public List<TasksInEventHoursRep> GetTasksInEventHoursRep(TasksInEventHoursRep t)
        {

            DBservices dbs = new DBservices();

            return dbs.GetTasksInEventHoursRep(t.FromDate, t.ToDate);
        }
    }
}