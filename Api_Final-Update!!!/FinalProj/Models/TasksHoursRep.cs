using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinalProj.Models
{
    public class TasksHoursRep
    {
        public int PersonEmpCode { get; set; }
        public double TotalTasksHours { get; set; }
        public string EmpFirstName { get; set; }
        public string EmpLastName { get; set; }
        public string DepartmentName { get; set; }

        public string FromDate { get; set; }
        public string ToDate { get; set; }

        // שימוש בגט עם הפרמטרים שקיבלנו מהריאקט
        public List<TasksHoursRep> GetTasksHoursRep(TasksHoursRep t)
        {

            DBservices dbs = new DBservices();

            return dbs.GetTasksHoursRep(t.FromDate, t.ToDate);
        }
    }
}